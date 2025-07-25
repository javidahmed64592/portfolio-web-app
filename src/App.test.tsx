import { screen } from "@testing-library/react";
import App from "./App";
import { Pages } from "./data";
import { setCurrentPage } from "./store/slices/pageSlice";
import {
  createTestStore,
  mockAppData,
  renderWithProviders,
} from "./test-utils";

describe("App Component", () => {
  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      renderWithProviders(<App />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the app structure with header and footer", () => {
      const store = createTestStore();

      // Simulate data loaded state
      store.dispatch({
        type: "appData/fetchAppData/fulfilled",
        payload: mockAppData(),
      });

      renderWithProviders(<App />, { store });

      // Check basic app structure elements that should always be present
      expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Link 1")).toBeInTheDocument();
      expect(screen.getByText("Link 2")).toBeInTheDocument();
      expect(screen.getByText("Link 3")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows loading message when data is being fetched", () => {
      renderWithProviders(<App />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Navigation Structure", () => {
    it("renders all navigation tabs", () => {
      const store = createTestStore();

      // Load app data to show header
      store.dispatch({
        type: "appData/fetchAppData/fulfilled",
        payload: mockAppData(),
      });

      renderWithProviders(<App />, { store });

      // Check navigation elements
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    it("renders app header with correct title", () => {
      const store = createTestStore();

      store.dispatch({
        type: "appData/fetchAppData/fulfilled",
        payload: mockAppData(),
      });

      renderWithProviders(<App />, { store });

      expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("renders social links in footer", () => {
      const store = createTestStore();

      store.dispatch({
        type: "appData/fetchAppData/fulfilled",
        payload: mockAppData(),
      });

      renderWithProviders(<App />, { store });

      // Check social links
      expect(screen.getByText("Link 1")).toBeInTheDocument();
      expect(screen.getByText("Link 2")).toBeInTheDocument();
      expect(screen.getByText("Link 3")).toBeInTheDocument();

      // Verify they are links
      const link1 = screen.getByText("Link 1").closest("a");
      const link2 = screen.getByText("Link 2").closest("a");
      const link3 = screen.getByText("Link 3").closest("a");

      expect(link1).toHaveAttribute("href", "https://link1.com");
      expect(link2).toHaveAttribute("href", "https://link2.com");
      expect(link3).toHaveAttribute("href", "https://link3.com");
    });
  });

  describe("Page State Management", () => {
    it("can change current page state", () => {
      const store = createTestStore();

      // Verify default page is Home
      expect(store.getState().page.currentPage).toBe(Pages.Home);

      // Change to Experience page
      store.dispatch(setCurrentPage(Pages.Experience));
      expect(store.getState().page.currentPage).toBe(Pages.Experience);

      // Change to Projects page
      store.dispatch(setCurrentPage(Pages.Projects));
      expect(store.getState().page.currentPage).toBe(Pages.Projects);
    });
  });

  describe("Data Loading Actions", () => {
    it("initializes component with proper Redux store", () => {
      const store = createTestStore();

      renderWithProviders(<App />, { store });

      // Verify the component renders (indicating store is working)
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      // Check that default page state exists
      expect(store.getState().page.currentPage).toBe(Pages.Home);
    });
  });

  describe("Theme Integration", () => {
    it("renders within theme provider context", () => {
      renderWithProviders(<App />);

      // Check that the app renders correctly with theme provider
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      // Verify the app structure is present
      const loadingElement = screen.getByText("Loading...");
      expect(loadingElement.parentElement).toBeInTheDocument();
    });
  });
});
