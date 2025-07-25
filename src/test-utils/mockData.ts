import {
  AppData,
  HomePageData,
  ExperiencePageData,
  ProjectsPageData,
  SocialLink,
  Technology,
  ProfileSummary,
  ProfessionalExperience,
  AcademicExperience,
  Project,
  GitHubProject,
} from "../data";

/**
 * Centralized mock data factory for consistent test data across the application
 */

// Base mock data builders
export const mockTechnologies = {
  tech_1: (): Technology => ({
    name: "Technology 1",
    url: "https://tech1.com",
  }),

  tech_2: (): Technology => ({
    name: "Technology 2",
    url: "https://tech2.com",
  }),

  tech_3: (): Technology => ({
    name: "Technology 3",
    url: "https://tech3.com",
  }),

  tech_4: (): Technology => ({
    name: "Technology 4",
    url: "https://tech4.com",
  }),
};

export const mockSocialLinks = {
  link_1: (): SocialLink => ({
    name: "Link 1",
    url: "https://link1.com",
    icon: "link1.svg",
  }),

  link_2: (): SocialLink => ({
    name: "Link 2",
    url: "https://link2.com",
    icon: "link2.svg",
  }),

  link_3: (): SocialLink => ({
    name: "Link 3",
    url: "https://link3.com",
    icon: "link3.svg",
  }),
};

export const mockProjects = {
  project_1: (): Project => ({
    title: "Project 1",
    description: "Project 1 description",
  }),

  project_2: (): Project => ({
    title: "Project 2",
    description: "Project 2 description",
  }),
};

export const mockGitHubProjects = {
  project_1: (): GitHubProject => ({
    title: "GitHub Project 1",
    description: "GitHub Project 1 description",
    url: "https://project1.com",
  }),

  project_2: (): GitHubProject => ({
    title: "GitHub Project 2",
    description: "GitHub Project 2 description",
    url: "https://project2.com",
  }),
};

// Complex data builders
export const mockProfileSummary = (): ProfileSummary => ({
  description: [
    "Profile summary line 1.",
    "Profile summary line 2.",
    "Profile summary line 3.",
  ],
});

export const mockProfessionalExperience = {
  experience_1: (): ProfessionalExperience => ({
    company: "Professional Company 1",
    position: "Professional Position 1",
    startDate: "01/01/2020",
    endDate: "Present",
    projects: [mockProjects.project_1()],
  }),

  noProjects: (): ProfessionalExperience => ({
    company: "No Projects Company",
    position: "No Projects Position",
    startDate: "01/01/2020",
    endDate: "Present",
    projects: [],
  }),
};

export const mockAcademicExperience = {
  experience_1: (): AcademicExperience => ({
    institution: "Academic Institution 1",
    degree: "Academic Degree 1",
    startDate: "01/01/2018",
    endDate: "01/01/2022",
    projects: [mockProjects.project_2()],
  }),
};

// Array builders for common scenarios
export const createMockTechnologies = (count: number = 3): Technology[] => {
  const technologies = [
    mockTechnologies.tech_1(),
    mockTechnologies.tech_2(),
    mockTechnologies.tech_3(),
    mockTechnologies.tech_4(),
  ];
  return technologies.slice(0, count);
};

export const createMockSocialLinks = (count: number = 2): SocialLink[] => {
  const links = [
    mockSocialLinks.link_1(),
    mockSocialLinks.link_2(),
    mockSocialLinks.link_3(),
  ];
  return links.slice(0, count);
};

// Full page data builders
export const mockAppData = (): AppData => ({
  appHeaderText: "Test Portfolio",
  socialLinks: createMockSocialLinks(3),
});

export const mockHomePageData = (): HomePageData => ({
  profileSummary: mockProfileSummary(),
  technologies: createMockTechnologies(4),
});

export const mockExperiencePageData = (): ExperiencePageData => ({
  professionalExperience: [mockProfessionalExperience.experience_1()],
  academicExperience: [mockAcademicExperience.experience_1()],
});

export const mockProjectsPageData = (): ProjectsPageData => ({
  projects: [mockGitHubProjects.project_1(), mockGitHubProjects.project_2()],
});
