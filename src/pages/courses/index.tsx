import { useState } from "react";
import Protected from "@/components/Protected";
import Frame from "@/components/ContentAlignment/Frame/Frame";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import H2 from "@/components/headings/H2";
import H5 from "@/components/headings/H5";
import H6 from "@/components/headings/H6";
import { getCourses } from "../api/course";
import type { Course } from "@/lib/types";

type CoursesProps = {
  courses: Course[];
};

export default function Courses(props: CoursesProps) {
  const cards: JSX.Element[] = props.courses.map((course, i) => {
    return <CourseCard data={course} key={i} />;
  });

  return (
    <Protected>
      <Frame>
        <div className="py-2">
          <H2>Courses</H2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">{cards}</div>
      </Frame>
    </Protected>
  );
}

export async function getServerSideProps(context) {
  const courses = await getCourses(context);
  const stringed = JSON.stringify(courses);
  const parsed = JSON.parse(stringed);
  return {
    props: { courses: parsed },
  };
}

function CourseCard(props) {
  const data: Course = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  let iconType;
  switch (data.location) {
    case "classroom":
      iconType = "BiChalkboard";
      break;
    case "virtual":
      iconType = "BiWebcam";
      break;
    case "distance":
      iconType = "BiWorld";
      break;
    default:
      iconType = "BiWorld";
      break;
  }
  return (
    <Card>
      <div className="relative h-full rounded-md border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8">
        <div className="flex min-h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Icon icon={iconType} size="5xl" color="primary" />
            <div>
              <span className="rounded-full bg-sapph-blue px-3 py-1.5 text-xs font-medium text-white">
                {data.type}
              </span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="pt-4">
              <H6>{data.name}</H6>
              <p className="mt-2 hidden text-sm sm:block">{data.description.substring(0, 100)}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <div className="w-3/4">
              <a href={`/courses/${data.id}`}>
                <Button>View</Button>
              </a>
            </div>
            <div
              onClick={() => setModalOpen(!modalOpen)}
              className="flex w-1/4 cursor-pointer justify-center rounded-md bg-pallete-orange p-1"
            >
              <Icon icon="BiTrash" size="2xl" color="dark" />
            </div>
            <Modal close={() => setModalOpen(false)} modalOpen={modalOpen}>
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <H5>Are you sure you want to delete?</H5>
                <p>
                  Note: This cannot be undone. Once deleted this course & all results will be removed from the
                  database.
                </p>
                <div className="flex gap-5">
                  <Button type="orange" onClick={() => console.log("Deleting...")}>
                    Confirm
                  </Button>
                  <Button type="light" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Card>
  );
}
