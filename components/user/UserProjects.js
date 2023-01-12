import ProjectCard from "../projects/ProjectCard";

function UserProjects({ projects }) {
  return (
    <div className="mt-6">
      <ul role="list" className="divide-y divide-gray-200">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </ul>
    </div>
  );
}

export default UserProjects;
