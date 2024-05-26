"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useData } from "@/context/data-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


export default function TeamsPage() {
  const data = useData();
  const [collapsed, setCollapsed] = useState({});
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [editedTeam, setEditedTeam] = useState({});
  const [editedEmployee, setEditedEmployee] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    title: "",
    email: "",
    current_score: 0,
    lessons_taken: 0,
    skills_being_developed: [],
  });
  const [newTeam, setNewTeam] = useState({
    title: "",
    description: "",
    employees: [],
    total_employee_count: 0,
    overall_score: 0,
  });

  const [teams, setTeams] = useState([]);

  const calculateOverallScore = (team) => {
    const totalScore = team.employees.reduce((acc, emp) => acc + emp.current_score, 0);
    const employeeCount = team.employees.length;
    return employeeCount > 0 ? (totalScore / employeeCount).toFixed(1) : "0.0";
  };

  const initializeTeams = (teamsData) => {
    return teamsData.map((team) => ({
      ...team,
      overall_score: calculateOverallScore(team),
    }));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTeams(initializeTeams(parsedData.data.teams || []));
    } else if (data) {
      setTeams(initializeTeams(data.data.teams || []));
    }
  }, [data]);

  const toggleCollapse = (index) => {
    setCollapsed((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEditTeamClick = (team) => {
    setCurrentTeam(team);
    setEditedTeam(team);
    setShowEditTeamModal(true);
  };

  const handleSaveTeamChanges = () => {
    const updatedTeams = teams.map((team) =>
      team.title === currentTeam.title
        ? { ...editedTeam, overall_score: calculateOverallScore(editedTeam) }
        : team
    );

    const updatedData = {
      ...data,
      data: { ...data.data, teams: updatedTeams },
    };
    localStorage.setItem("dashboardData", JSON.stringify(updatedData));
    setTeams(updatedTeams);
    setShowEditTeamModal(false);
    setCurrentTeam(null);
  };

  const handleEditEmployeeClick = (employee) => {
    setCurrentEmployee(employee);
    setEditedEmployee(employee);
    setShowEditEmployeeModal(true);
  };

  const handleSaveEmployeeChanges = () => {
    const updatedTeams = teams.map((team) => {
      if (team.title === currentTeam.title) {
        const updatedEmployees = team.employees.map((emp) =>
          emp.email === currentEmployee.email ? editedEmployee : emp
        );
        return {
          ...team,
          employees: updatedEmployees,
          total_employee_count: updatedEmployees.length,
          overall_score: calculateOverallScore({ ...team, employees: updatedEmployees }),
        };
      } else {
        return team;
      }
    });

    const updatedData = {
      ...data,
      data: { ...data.data, teams: updatedTeams },
    };
    localStorage.setItem("dashboardData", JSON.stringify(updatedData));
    setTeams(updatedTeams);
    setShowEditEmployeeModal(false);
    setCurrentEmployee(null);
  };

  const handleDeleteEmployee = (teamTitle, email) => {
    const updatedTeams = teams.map((team) => {
      if (team.title === teamTitle) {
        const updatedEmployees = team.employees.filter(
          (emp) => emp.email !== email
        );
        return {
          ...team,
          employees: updatedEmployees,
          total_employee_count: updatedEmployees.length,
          overall_score: calculateOverallScore({ ...team, employees: updatedEmployees }),
        };
      } else {
        return team;
      }
    });

    const updatedData = {
      ...data,
      data: { ...data.data, teams: updatedTeams },
    };
    localStorage.setItem("dashboardData", JSON.stringify(updatedData));
    setTeams(updatedTeams);
  };

  const handleAddEmployee = () => {
    const updatedTeams = teams.map((team) => {
      if (team.title === currentTeam.title) {
        const updatedEmployees = [...team.employees, newEmployee];
        return {
          ...team,
          employees: updatedEmployees,
          total_employee_count: updatedEmployees.length,
          overall_score: calculateOverallScore({ ...team, employees: updatedEmployees }),
        };
      } else {
        return team;
      }
    });

    const updatedData = {
      ...data,
      data: { ...data.data, teams: updatedTeams },
    };
    localStorage.setItem("dashboardData", JSON.stringify(updatedData));
    setTeams(updatedTeams);
    setShowAddEmployeeModal(false);
    setCurrentTeam(null);
    setNewEmployee({
      name: "",
      title: "",
      email: "",
      current_score: 0,
      lessons_taken: 0,
      skills_being_developed: [],
    });
  };

  const handleAddTeam = () => {
    const updatedTeams = [...teams, newTeam];
    const updatedData = {
      ...data,
      data: { ...data.data, teams: updatedTeams },
    };
    localStorage.setItem("dashboardData", JSON.stringify(updatedData));
    setTeams(updatedTeams);
    setShowAddTeamModal(false);
    setNewTeam({
      title: "",
      description: "",
      employees: [],
      total_employee_count: 0,
      overall_score: 0,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-md-12 m-1 d-flex justify-content-between">
          <Button variant="primary" onClick={() => setShowAddTeamModal(true)}>
            Add Team <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        {teams.map((team, index) => (
          <div className="col-md-12" key={index}>
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title">
                  {team.title} Team
                  <button
                    className="btn btn-link"
                    onClick={() => toggleCollapse(index)}
                  >
                    <FontAwesomeIcon
                      icon={collapsed[index] ? faChevronUp : faChevronDown}
                    />
                  </button>
                  <button
                    className="btn btn-link"
                    onClick={() => handleEditTeamClick(team)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </h5>
                <small className="card-text">{team.description}</small>
                <div
                  className={`collapse ${collapsed[index] ? "show" : ""}`}
                  id={`collapse-${index}`}
                >
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Title</th>
                          <th>Email</th>
                          <th>Current Score</th>
                          <th>Lessons Taken</th>
                          <th>Skills Being Developed</th>
                          <th>
                            <Button
                              variant="link"
                              onClick={() => {
                                setCurrentTeam(team);
                                setShowAddEmployeeModal(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.employees.map((employee, empIndex) => (
                          <tr key={employee.email}>
                            <td>{employee.name}</td>
                            <td>{employee.title}</td>
                            <td>{employee.email}</td>
                            <td>{employee.current_score}</td>
                            <td>{employee.lessons_taken}</td>
                            <td>
                              <ul>
                                {employee.skills_being_developed.map(
                                  (skill, skillIndex) => (
                                    <li key={skillIndex}>
                                      <small>{skill}</small>
                                    </li>
                                  )
                                )}
                              </ul>
                            </td>
                            <td>
                              <Button
                                variant="link"
                                onClick={() => {
                                  setCurrentTeam(team);
                                  handleEditEmployeeClick(employee);
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleDeleteEmployee(
                                    team.title,
                                    employee.email
                                  )
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h6 className="text-end">
                    Overall Score: {team.overall_score} Total Employees:{" "}
                    {team.total_employee_count}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showEditTeamModal}
        onHide={() => setShowEditTeamModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentTeam?.title} Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTeam.title}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedTeam.description}
                onChange={(e) =>
                  setEditedTeam({ ...editedTeam, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditTeamModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTeamChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditEmployeeModal}
        onHide={() => setShowEditEmployeeModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedEmployee.name}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedEmployee.title}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editedEmployee.email}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Current Score</Form.Label>
              <Form.Control
                type="number"
                value={editedEmployee.current_score}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    current_score: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lessons Taken</Form.Label>
              <Form.Control
                type="number"
                value={editedEmployee.lessons_taken}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    lessons_taken: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Skills Being Developed</Form.Label>
              <Form.Control
                type="text"
                value={
                  editedEmployee.skills_being_developed
                    ? editedEmployee.skills_being_developed.join(", ")
                    : ""
                }
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    skills_being_developed: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditEmployeeModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEmployeeChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddEmployeeModal}
        onHide={() => setShowAddEmployeeModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEmployee.title}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Current Score</Form.Label>
              <Form.Control
                type="number"
                value={newEmployee.current_score}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    current_score: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lessons Taken</Form.Label>
              <Form.Control
                type="number"
                value={newEmployee.lessons_taken}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    lessons_taken: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Skills Being Developed</Form.Label>
              <Form.Control
                type="text"
                value={newEmployee.skills_being_developed.join(", ")}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    skills_being_developed: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddEmployeeModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddTeamModal} onHide={() => setShowAddTeamModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTeam.title}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newTeam.description}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddTeamModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTeam}>
            Add Team
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
