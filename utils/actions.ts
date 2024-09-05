"use server";

import { profileSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};

export const fetchProfileData = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) return redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.safeParse(rawData);
    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((error) => error.message);
      throw new Error(errors.join(", "));
    }
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return {
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
