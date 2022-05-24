import Course from './components/Course'

const App = () => {
  const courses =[
  {
    name:"Half stack application development",
    parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "Testataas tääki",
      exercises: 1127,
    },
    {
      name: "jaaaa tääki",
      exercises: 1,
    },
    {
      name: "State of a component",
      exercises: 14,
    }
    ]
  },
  {
    name:"Puolimaraton",
    parts: [
    {
      name: "Vain tää yks",
      exercises: 14,
    }
    ]
  }];

  return (
    <div>
      {courses.map((course,ix)=>{
        return <Course key={ix} course={course}/>
      })}
    </div>
  );
};

export default App;
