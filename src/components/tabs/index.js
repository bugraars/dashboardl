"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faGraduationCap,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

function Tabs() {
  const pathname = usePathname();

  return (
    <div className="container-fluid m-2">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <Link
            href="/dashboard"
            className={`nav-link text-primary ${
              pathname === "/dashboard" ? "active" : ""
            }`}
            aria-current="page"
          >
            <FontAwesomeIcon
              className="d-inline-block align-text-top me-2"
              icon={faChartPie}
              alt="Logo"
              width="16"
              height="16"
            />
            Statistics
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/dashboard/courses"
            className={`nav-link text-primary ${
              pathname === "/dashboard/courses" ? "active" : ""
            }`}
            aria-current="page"
          >
            <FontAwesomeIcon
              className="d-inline-block align-text-top me-2"
              icon={faGraduationCap}
              alt="Logo"
              width="16"
              height="16"
            />
            Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/dashboard/teams"
            className={`nav-link text-primary ${
              pathname === "/dashboard/teams" ? "active" : ""
            }`}
            aria-current="page"
          >
            <FontAwesomeIcon
              className="d-inline-block align-text-top me-2"
              icon={faPeopleGroup}
              alt="Logo"
              width="16"
              height="16"
            />
            Teams
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { Tabs };
