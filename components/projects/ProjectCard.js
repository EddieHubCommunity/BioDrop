import React from "react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import FallbackImage from "../FallbackImage";

function ProjectCard({ project }) {
  const fallbackImageSize = 60;
  return (
    <li className="py-4 border-l-2 mb-4 pl-2 hover:border-l-4 pr-2 shadow-md">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={project.url}
              key={project.title}
              target="_blank"
              rel="noreferrer"
              className="text-lg lg:text-xl tracking-wide font-medium capitalize"
            >
              {project.title}
            </Link>
            <ReactMarkdown className="text-sm text-gray-500 py-1 flex-wrap">
              {project.description}
            </ReactMarkdown>
            <div className="flex flex-col">
              <div className="text-sm text-gray-600 py-1">Tech Used</div>
              <div className="flex flex-wrap">
                {project.techUsed.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-full mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center my-4">
              <a
                href={project.githubrepo}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
              >
                GitHub Repo
              </a>
              <a
                href={project.website}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Website
              </a>
            </div>
          </div>
          {console.log(project.contributors[0].avatar)}
          <Link
            href={project.contributors[0].avatar}
            className="group hidden lg:block flex-shrink-0 lg:pr-4"
          >
            <FallbackImage
              src={project.contributors[0].avatar}
              alt={`Profile picture of ${project.contributors[0].username}`}
              width={fallbackImageSize}
              height={fallbackImageSize}
              fallback={project.contributors[0].username}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
