"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Schedule = ({ stages }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);

  const allDays = [
    ...new Set(
      stages.flatMap(({ stageSchedule }) => Object.keys(stageSchedule))
    )
  ];

  const allGenres = [
    ...new Set(
      stages.flatMap(({ stageSchedule }) =>
        Object.values(stageSchedule).flatMap((day) =>
          day
            .map(({ genre }) => genre)
            .filter((genre) => genre && genre !== "Unknown")
        )
      )
    )
  ];

  const handleStageFilter = (stageName) => {
    setSelectedStage(stageName === selectedStage ? null : stageName);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  const scrollToDay = (day) => {
    const element = document.getElementById(day);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-4 lg:mx-24">
      <div className="gap-6 mt-7 mb-20 ">
        <div className="flex flex-wrap gap-3 mb-8 justify-center font-oswald">
          {stages.map(({ name }) => (
            <button
              key={name}
              onClick={() => handleStageFilter(name)}
              className={`px-6 py-2 rounded-full border ${
                selectedStage === name
                  ? "bg-primary text-white border-primary"
                  : "bg-inherit text-inherit border-primary hover:bg-primary transition ease-out duration-200 hover:text-black"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-8  justify-center font-oswald">
          {allDays.map((day) => (
            <button
              key={day}
              onClick={() => scrollToDay(day)}
              className="px-6 py-2 bg-primary text-inherit rounded-full  border hover:bg-transparent border-primary hover:text-inverted transition ease-out duration-200"
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-6 font-oswald">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreFilter(genre)}
              className={`px-6 py-2 rounded-full border ${
                selectedGenre === genre
                  ? "bg-primary text-white border-primary"
                  : "bg-inherit text-inherit border-primary hover:bg-primary transition ease-out duration-200 hover:text-black"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`${
          selectedStage
            ? "flex justify-center items-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6"
        }`}
      >
        {stages
          .filter(({ name }) => !selectedStage || selectedStage === name)
          .map(({ name, stageSchedule }) => (
            <div
              key={name}
              className={`rounded-xl shadow bg-inherit border-darkorange border-2 text-center p-8 mb-8 ${
                selectedStage ? "w-full max-w-7xl" : ""
              }`}
            >
              <h2 className="text-md text-3xl font-bold mb-8 text-inherit font-oswald">
                {name}
              </h2>
              {Object.keys(stageSchedule).map((day) => {
                const filteredEvents = stageSchedule[day]?.filter(
                  ({ genre }) =>
                    (!selectedGenre || genre === selectedGenre) &&
                    genre !== "Unknown"
                );

                if (!filteredEvents || filteredEvents.length === 0) {
                  return null;
                }

                return (
                  <div key={day} id={day} className="mb-2">
                    <h3 className="text-lg font-semibold mb-1 capitalize text-inherit">
                      {day}
                    </h3>
                    <div className="grid gap-1">
                      {filteredEvents.map(
                        (
                          {
                            start,
                            end,
                            act,
                            genre,
                            bio,
                            members,
                            logo,
                            logoCredits,
                            cancelled
                          },
                          index
                        ) => (
                          <Sheet key={index}>
                            <SheetTrigger asChild>
                              <Card
                                onClick={() =>
                                  setSelectedBand({
                                    act,
                                    start,
                                    end,
                                    genre,
                                    bio,
                                    members,
                                    logo,
                                    logoCredits,
                                    cancelled
                                  })
                                }
                                className={`hover:scale-[1.03] transition ease-in-out duration-300 border rounded-xl bg-inherit cursor-pointer ${
                                  cancelled
                                    ? "bg-red-900 border-red-500 text-white" // Hvis aflyst: rød baggrund og border
                                    : "border-darkorange hover:border-primary hover:text-primary hover:bg-primary/40"
                                }`}
                              >
                                <CardHeader className="p-2 ">
                                  <CardTitle className="text-xs font-bold flex justify-between items-center text-inherit">
                                    <span>{act}</span>
                                    {cancelled && (
                                      <span className="text-red-500 font-semibold">
                                        (CANCELED)
                                      </span>
                                    )}
                                    <span className="text-gray-500 text-[10px]">
                                      {start} - {end}
                                    </span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                  {genre && (
                                    <p className="text-gray-400 italic text-[10px]">
                                      {genre}
                                    </p>
                                  )}
                                </CardContent>
                              </Card>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                {selectedBand?.logo && (
                                  <div className="flex justify-center my-4">
                                    <Avatar className="w-32 h-32">
                                      <AvatarImage
                                        src={selectedBand.logo}
                                        alt={selectedBand.act}
                                      />
                                      <AvatarFallback>
                                        {selectedBand.act}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                )}

                                <SheetTitle className="text-lg font-bold">
                                  {selectedBand?.act || ""}
                                </SheetTitle>

                                <SheetDescription className="text-sm">
                                  Time: {selectedBand?.start} -{" "}
                                  {selectedBand?.end}
                                </SheetDescription>

                                {selectedBand?.genre && (
                                  <SheetDescription className="italic text-gray-400">
                                    Genre: {selectedBand.genre}
                                  </SheetDescription>
                                )}

                                {/* Cancelled Notice */}
                                {selectedBand?.cancelled && (
                                  <SheetDescription className="text-red-500 font-semibold">
                                    CANCELED
                                  </SheetDescription>
                                )}
                              </SheetHeader>
                            </SheetContent>
                          </Sheet>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
