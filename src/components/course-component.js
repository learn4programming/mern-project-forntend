import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  const handleUnenroll = (e) => {
    CourseService.unenroll(e.target.id)
      .then(() => {
        window.alert("取消註冊成功");
        setCourseData(
          courseData.filter((course) => course._id !== e.target.id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>
            您必須先登入才能看到課程。
            <button
              className="btn btn-primary btn-lg"
              onClick={handleTakeLogin}
            >
              回到登入頁面
            </button>
          </p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面。</h1>
          <br />

          {courseData && courseData.length == 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h3>目前尚未新增課程</h3>
            </div>
          )}
        </div>
      )}

      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面。</h1>
          <br />

          {courseData && courseData.length == 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h3>目前尚未註冊課程</h3>
            </div>
          )}
        </div>
      )}

      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", margin: "0.5rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                  <a
                    href="#"
                    onClick={handleUnenroll}
                    className="card-text btn btn-primary"
                    id={course._id}
                  >
                    取消註冊
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
