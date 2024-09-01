const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </>
  );
};

const Total = (props) => {
  const sum =
    props.total[0].exercises +
    props.total[1].exercises +
    props.total[2].exercises;
  return <> Number of exercises {sum}</>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
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
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header header={course.name} />

      <Content parts={course.parts} />

      <Total total={course.parts} />
    </>
  );
};

export default App;
