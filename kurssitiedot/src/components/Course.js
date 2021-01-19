import React from 'react'

const Course = (props) => {
    return (
      <>
        {props.courses.map(course =>
          <div key={course.id} >
            <Header courseName={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
          </div>
        )}
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>{props.courseName}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part parts={props.course.parts} />
      </div >
    )
  }
  
  const Total = (props) => {
  
    const sum = props.parts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.exercises
    }, 0)
  
    return (
      <div>
  
        <b>
          total of {sum} exercises
      </b>
  
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>)}
      </div>
    )
  }



export default Course