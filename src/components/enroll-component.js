import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.user.role == "student") {
      CourseService.getAllCourses()
        .then((response) => {
          setAllCourses(response.data);
          setSearchResult(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    if (searchInput === "") {
      setSearchResult(allCourses);
    }
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功。");
      })
      .catch((err) => {
        window.alert(err.response.data);
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>你必須先登入才能查詢課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能註冊課程。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
            placeholder="請輸入課程名稱..."
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((course) => (
            <div
              key={course._id}
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
                <p style={{ margin: "0.5rem 0rem" }}>
                  講師: {course.instructor.username}
                </p>
                <a
                  href="#"
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={course._id}
                >
                  註冊課程
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>沒有找到符合條件的課程。</p>
        )}
      </div>
    </div>
  );
};

export default EnrollComponent;
