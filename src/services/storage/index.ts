import { Project, ProjectState, upProject } from '../../slices/project';

import { useAppDispatch } from '../../hooks';

interface ProjectNames {
  name: string;
}

export const verifyExistingProjects = (): ProjectNames[] => {
  if (!localStorage.CswProjects) {
    localStorage.CswProjects = JSON.stringify([]);
    return [];
  }
  const existingProjects: Project[] = JSON.parse(localStorage.CswProjects);
  if (existingProjects.length > 0) return existingProjects.map(({ name }) => ({ name }));
  return [];
};

export const saveProject = (projectState: ProjectState) => {
  const { tabIndex, ...project } = projectState;

  const existingProjects: Project[] = JSON.parse(localStorage.CswProjects);
  const IsThereThisProject = existingProjects.some(({ name }) => name === project.name);
  let updatedProjects: Project[];
  if (IsThereThisProject) {
    updatedProjects = existingProjects.map((curProject) => (
      curProject.name === project.name ? project : curProject));
  } else {
    updatedProjects = [...existingProjects, project];
  }

  localStorage.CswProjects = JSON.stringify(updatedProjects);
};

export const initiateProject = (dispatch: ReturnType<typeof useAppDispatch>,
  projectName: string) => {
  const existingProjects: Project[] = JSON.parse(localStorage.CswProjects);
  const curProject = existingProjects.find(({ name }) => name === projectName) as Project;
  console.log(curProject);
  return Promise.resolve(dispatch(upProject(curProject)));
};

export const delProject = (projectName: string) => {
  const existingProjects: Project[] = JSON.parse(localStorage.CswProjects);

  const updatedProjects = existingProjects.filter(({ name }) => name !== projectName);
  localStorage.CswProjects = JSON.stringify(updatedProjects);
};
