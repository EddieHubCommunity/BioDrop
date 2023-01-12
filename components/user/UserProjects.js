import ProjectCard from "../projects/ProjectCard";

function UserProjects({ projects }) {
  return (
    <div className="flex flex-wrap">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}

export default UserProjects;
