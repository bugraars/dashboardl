"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useData } from "@/context/data-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import "@/styles/globals.css";
export default function CoursesPage() {
  const data = useData();

  const inProgressCourses = data.data.in_progress_courses || [];
  const upcomingCourses = data.data.upcoming_courses || [];

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-md-12 m-1">
          <h5>In Progress Courses</h5>
        </div>
        {inProgressCourses.map((course) => (
          <div className="col-md-4" key={course.id}>
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {course.title}
                  <FontAwesomeIcon icon={faAward} className="text-warning" />
                </h5>
                <small>Educator: {course.assigned_to}</small>
                <p className="card-text">{course.description}</p>
                <h6>Due date: {course.due_date}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mb-2">
        <div className="col-md-12 m-1">
          <h5>Upcoming Courses</h5>
        </div>
        {upcomingCourses.map((course) => (
          <div className="col-md-4" key={course.id}>
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {course.title}
                  <FontAwesomeIcon icon={faAward} className="text-warning" />
                </h5>
                <small>Educator: {course.assigned_to}</small>
                <p className="card-text">{course.description}</p>
                <h6>Due date: {course.due_date}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
