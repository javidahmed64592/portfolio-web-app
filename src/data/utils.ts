import {
  AppData,
  ExperiencePageData,
  HomePageData,
  ProjectsPageData,
  SocialLink,
  Pages,
} from "./types";

// Common
const baseUrl = process.env.PUBLIC_URL || "";
const assetsDir = `${baseUrl}/assets`;
const dataDir = `${assetsDir}/data`;
const iconDir = `${assetsDir}/icons`;

export const dataPath = (data: string) => `${dataDir}/${data}`;
export const iconPath = (icon: string) => `${iconDir}/${icon}`;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

// App data
export const getAppData = async (): Promise<AppData> => {
  const rawData = (await fetchJson(dataPath("appData.json"))) as AppData;

  // Process the data to add full paths for icons
  return {
    ...rawData,
    socialLinks: rawData.socialLinks.map((link: SocialLink) => ({
      ...link,
      icon: iconPath(link.icon),
    })),
  };
};

export const pages: Pages[] = Object.values(Pages);

// Home page data
export const getHomePageData = async (): Promise<HomePageData> => {
  const rawData = (await fetchJson(
    dataPath("homePageData.json")
  )) as HomePageData;
  return rawData;
};

// Experience page data
export const getExperiencePageData = async (): Promise<ExperiencePageData> => {
  const rawData = (await fetchJson(
    dataPath("experiencePageData.json")
  )) as ExperiencePageData;
  return rawData;
};

// Projects page data
export const getProjectsPageData = async (): Promise<ProjectsPageData> => {
  const rawData = (await fetchJson(
    dataPath("projectsPageData.json")
  )) as ProjectsPageData;
  return rawData;
};
