import { getBands, getScheduleSlider } from "@/lib/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getImageUrl(band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  return band.logo?.startsWith("https://")
    ? band.logo
    : `${baseUrl}/logos/${band.logo}`;
}

async function fetchBandsAndSchedules() {
  try {
    const bands = await getBands();
    const schedules = (await getScheduleSlider()) || {};

    return { bands, schedules };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { bands: [], schedules: {} };
  }
}

export default async function DisplayArtists() {
  const { bands, schedules } = await fetchBandsAndSchedules();

  return (
    <div className="px-10">
      <div className="flex flex-col items-center justify-center my-12">
        <h1 className="text-center text-4xl font-bold font-titan text-inherit">
          All artist
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-0 md:mx-8">
        {bands.map((band, index) => {
          const bandSchedule = [];

          if (schedules && Object.keys(schedules).length > 0) {
            Object.entries(schedules).forEach(([stage, days]) => {
              Object.entries(days).forEach(([day, slots]) => {
                slots.forEach((slot) => {
                  if (slot.act?.toLowerCase() === band.name.toLowerCase()) {
                    bandSchedule.push({
                      stage,
                      day,
                      start: slot.start,
                      end: slot.end
                    });
                  }
                });
              });
            });
          }

          return (
            <Sheet key={band.id || index}>
              <SheetTrigger asChild>
                <Card className="hover:scale-105 transition ease-in-out duration-100 hover:border-primary border-4 cursor-pointer rounded-xl bg-black">
                  <CardContent className="p-0">
                    <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
                      <Avatar className="absolute inset-0 w-full h-full">
                        <AvatarImage
                          src={getImageUrl(band)}
                          alt={band.name}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                        <AvatarFallback>{band.name}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                  <CardHeader className="py-4">
                    <CardTitle className="text-center text-2xl font-bold">
                      {band.name}
                    </CardTitle>
                    <CardDescription className="text-center text-primary">
                      {band.genre || "Genre Not Available"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </SheetTrigger>

              <SheetContent
                className="p-6 flex flex-col bg-inherit"
                style={{ height: "100vh", maxHeight: "100vh" }}
              >
                <SheetHeader>
                  <SheetTitle className="text-4xl font-bold text-primary">
                    {band.name}
                  </SheetTitle>
                  <SheetDescription className="text-inherit">
                    Scroll for more information
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-4 space-y-4 overflow-y-auto flex-1">
                  <div className="flex justify-center py-4">
                    <Avatar className="w-48 h-48 rounded-xl">
                      <AvatarImage
                        src={getImageUrl(band)}
                        alt={band.name}
                        loading="lazy"
                        className="object-cover"
                      />
                      <AvatarFallback>{band.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-lg my-2 text-inherit">
                    {band.bio || "Biography not available."}
                  </div>
                  <div className="font-semibold text-inverted">
                    Genre: {band.genre}
                  </div>
                  <div className="text-sm text-gray-300">
                    {band.members?.join(", ") || "No members listed"}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      Schedule
                    </h3>
                    {bandSchedule.length > 0 ? (
                      <ul className="space-y-2 text-sm text-gray-300">
                        {bandSchedule.map((slot, index) => (
                          <li key={index}>
                            {slot.day}: {slot.start} - {slot.end} on{" "}
                            {slot.stage}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400">
                        No schedule available.
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          );
        })}
      </div>
    </div>
  );
}
