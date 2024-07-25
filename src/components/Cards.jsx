import {
  closestCorners,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Logo, Card } from "./index.js";
import { useState } from "react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import data from "../data/courses_data.json";

function Cards() {
  const [courses, setCourses] = useState(data);

  const getCoursePos = (id) => {
    return courses.findIndex((course) => course.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setCourses(() => {
      const originalPos = getCoursePos(active.id);
      const newPos = getCoursePos(over.id);

      return arrayMove(courses, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      onActivation: (event) => console.log("onActivation", event), // Here!
      activationConstraint: { distance: 5 },
    })
  );

  const getCurrCourse = (id) => {
    return courses.filter((course) => course.id === id);
  };

  const handleToTop = (id) => {
    const currCourse = getCurrCourse(id);
    setCourses((prev) => [
      ...currCourse,
      ...prev.filter((course) => course.id !== id),
    ]);
  };

  const handleToBottom = (id) => {
    const currCourse = getCurrCourse(id);
    setCourses((prev) => [
      ...prev.filter((course) => course.id !== id),
      ...currCourse,
    ]);
  };

  const handleRemove = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <div
      className="relative bg-[#D2E3C8] min-h-screen min-w-full flex justify-center items-start
"
    >
      <div className="flex flex-col justify-start items-center gap-8 my-12 ">
        <h1 className="text-[#4F6F52] text-7xl font-bold">Chai aur Code</h1>
        <div className="bg-[#F9F7F7] w-[1000px] h-[700px] flex flex-col gap-4 p-8 rounded-[18px]">
          <h2 className="text-3xl font-semibold">Manage Bundle</h2>
          <p className="text-[#4B4747]">
            Change orders of the products based on priority
          </p>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            sensors={sensors}
          >
            <div className="w-full flex flex-col justify-start items-start">
              <SortableContext
                items={courses}
                strategy={verticalListSortingStrategy}
              >
                {courses.map((course) => (
                  <div key={course.id} className="w-10/12">
                    <Card
                      id={course.id}
                      src={course.src}
                      name={course.name}
                      price={course.price}
                      type={course.type}
                      handleToTop={handleToTop}
                      handleToBottom={handleToBottom}
                      handleRemove={handleRemove}
                    />
                  </div>
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
      <Logo />
    </div>
  );
}

export default Cards;
