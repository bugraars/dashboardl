"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PieChart from "@/components/pie-chart";
import ActivityHoursChart from "@/components/ActivityHoursChart";
import { useData } from "@/context/data-context";
import "@/styles/globals.css";
export default function Page() {
  const dataContext = useData();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataContext) {
      setData(dataContext);
    }
  }, [dataContext]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem("dashboardData"));
      if (updatedData) {
        setData(updatedData);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!data) {
    return (
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title skeleton-placeholder"></h5>
                <p className="card-text skeleton-placeholder"></p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title skeleton-placeholder"></h5>
                <p className="card-text skeleton-placeholder"></p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title skeleton-placeholder"></h5>
                <p className="card-text skeleton-placeholder"></p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title skeleton-placeholder"></h5>
                <p className="card-text skeleton-placeholder"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="row mb-2">
              <div className="col-md-6">
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title skeleton-placeholder"></h5>
                    <p className="card-text skeleton-placeholder"></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title skeleton-placeholder"></h5>
                    <p className="card-text skeleton-placeholder"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title skeleton-placeholder"></h5>
                    <p className="card-text skeleton-placeholder"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title skeleton-placeholder"></h5>
                    <ul className="card-text">
                      <li className="skeleton-placeholder"></li>
                      <li className="skeleton-placeholder"></li>
                      <li className="skeleton-placeholder"></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title skeleton-placeholder"></h5>
                    <p className="card-text skeleton-placeholder"></p>
                    <a href="#" className="btn w-100 skeleton-placeholder"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalExamsCompleted = data.data.activity_hours.reduce(
    (total, day) => total + day.exams_completed,
    0
  );
  const totalLessonsTaken = data.data.activity_hours.reduce(
    (total, day) => total + day.lessons_taken,
    0
  );
  const averageEmployeeScore = data.data.average_employee_score;
  const topPerformingTeams = data.data.teams.map((team) => ({
    title: team.title,
    score: team.overall_score,
  }));
  const topSkills = data.data.top_skills;
  const totalEmployees = data.data.teams.reduce(
    (total, team) => total + team.total_employee_count,
    0
  );
  const totalCompletedCourses = data.data.total_completed_courses;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
  <div className="col-md-3">
    <div className="card m-1 bg-primary text-white">
      <div className="card-body">
        <h5 className="card-title">Total Employees</h5>
        <p className="card-text">{totalEmployees}</p>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card m-1 bg-success text-white">
      <div className="card-body">
        <h5 className="card-title">Total Completed Courses</h5>
        <p className="card-text">{totalCompletedCourses}</p>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card m-1 bg-warning text-white">
      <div className="card-body">
        <h5 className="card-title">Total Exams Completed</h5>
        <p className="card-text">{totalExamsCompleted}</p>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card m-1 bg-danger text-white">
      <div className="card-body">
        <h5 className="card-title">Total Lessons Taken</h5>
        <p className="card-text">{totalLessonsTaken}</p>
      </div>
    </div>
  </div>
</div>

      <div className="row">
        <div className="col-md-9">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card m-1">
                <div className="card-body">
                  <h5 className="card-title">Activity Hours</h5>
                  <ActivityHoursChart data={data.data.activity_hours} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            {topPerformingTeams.map((team) => (
              <div className="col-md-6" key={team.title}>
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title">{team.title}</h5>
                    <p className="card-text">Overall Score: {team.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card m-1">
                <div className="card-body">
                  <h5 className="card-title">Top Skills</h5>
                  <ul className="card-text">
                    {topSkills.map((skill) => (
                      <li key={skill.skill}>
                        {skill.skill}: {skill.employees} employees
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card m-1">
                <PieChart data={data.data} />
                <div className="card-body">
                  <h5 className="card-title">Skills Development</h5>
                  <p className="card-text">
                    The distribution of skills being developed by employees.
                  </p>
                  <a
                    href="#"
                    className="btn w-100 text-white"
                    style={{ backgroundColor: "#1D9DED" }}
                  >
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card m-1 link-buri">
                <a
                  className="p-4"
                  href="https://www.linkedin.com/in/bugra-arslan/"
                  target="_blank"
                >
                  Made with ❤️ by Buğra Arslan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
