import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import axios, { AxiosResponse } from "axios";

type dummyUsersProps = {
  user: {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
  };
  profile: {
    userId: string;
    age: number;
    location: string;
    gender: string;
  };
  stream: {
    userId: string;
    name: string;
    thumbnailUrl: string;
    tags: string[];
  };
};

function generateDummyUsers(data: UserSeedProfile[]) {
  const seedData = data.map((item) => {
    const userId = randomBytes(12).toString('hex');
    const tagsArray = Object.values(item.tags);
    const user = {
      id: userId,
      username: item.username,
      imageUrl: item.profile_images.profile_image,
      externalUserId: randomBytes(12).toString('hex'),
    };
    const profile = {
      userId: userId,
      age: parseInt(item.display_age),
      location: item.homecountry || "other",
      gender: item.gender,
    };
    const stream = {
      userId: userId,
      name: `${item.display_name}'s stream`,
      thumbnailUrl: item.profile_images.profile_image,
      tags: tagsArray,
      ingressId: randomBytes(12).toString('hex'),
    };
    return { user, profile, stream };
  });
  return seedData;
}

// App Router: Exporting the POST handler
export async function POST(req: Request) {

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Method not allowed" }),
      { status: 405 }
    );
  }

  try {
    // Fetch data from the external API
    const response: AxiosResponse<{ models: UserSeedProfile[] }> = await axios.get(
      "https://bcprm.com/api/v2/models-online?c=743541&client_ip=2.2.2.2"
    );

    const dummyUsers = generateDummyUsers(response.data.models);

    // Create users in the database
    const createUsers = async (dummyUsers: dummyUsersProps[]) => {
      const promises = dummyUsers.map(async (user) => {
        if (!user.user || !user.profile || !user.stream) {
          console.error("Invalid user data", user);
          return;
        }
        return db.$transaction([
          db.user.create({
            data: user.user,
          }),
          db.profile.create({
            data: user.profile,
          }),
          db.stream.create({
            data: user.stream,
          }),
        ]);
      });

      // Wait for all promises to resolve
      await Promise.all(promises);
    };

    // Execute user creation
    await createUsers(dummyUsers);

    return new Response(
      JSON.stringify({
        message: "Database seeded successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error seeding database:", errorMessage);
    return new Response(
      JSON.stringify({
        message: "Error seeding database",
        error: errorMessage,
      }),
      { status: 500 }
    );
  } 
}
