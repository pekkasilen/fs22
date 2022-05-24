const Header = (props) => {
    return <h1>{props.name}</h1>;
  };
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((p,i)=> <Part key={i} part={p}/>)}
      </div>
    );
  };
  
  const Total = ({parts}) => {
    return (
      <p>
        Number of exercises{" "}
        {parts.reduce((p, acc) => {
            return (acc.exercises+p)
          },0)
        }
      </p>
    );
  };
  
  const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course