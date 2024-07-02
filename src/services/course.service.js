import axios from "axios";
// const API_URL = "https://mern-project-api-bycc.onrender.com";
const API_URL = "http://localhost:8080";

//HEY
class CourseForService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/api/courses/",
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getAllCourses() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/api/courses/", {
      headers: {
        Authorization: token,
      },
    });
  }

  // 使用學生id，找到學生註冊的課程
  getEnrolledCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/api/courses/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // 使用instructor id，來找到講師擁有的課程
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/api/courses/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/api/courses/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/api/courses/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  unenroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/api/courses/unenroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/api/courses/delete/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 0701新增: 遊客可看所有課程
  getAllPublicCourses() {
    return axios.get(API_URL + "/public/");
  }

  // 0701新增: 遊客亦可使用查詢課程系統
  getPublicCourseByName(name) {
    return axios.get(API_URL + "/public/findByName/" + name);
  }
}

const CourseService = new CourseForService();
export default CourseService;
