import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useWorkoutPlan } from "../hooks/useWorkoutPlan";
import { requestWorkoutPlan } from "../services/workoutService";
import type { WorkoutDay } from "../domain/models/interfaces/IWorkoutDay";

vi.mock("../utils/api");
vi.mock("../store/auth-context");

import api from "../utils/api";
import { useAuth } from "../store/auth-context";

const mockApi = api as { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

const sampleWorkouts: WorkoutDay[] = [
  {
    day: "Monday",
    exercises: [
      {
        id: "1",
        name: "Push Up",
        bodyPart: "chest",
        equipment: "body weight",
        gifUrl: "https://example.com/pushup.gif",
      },
    ],
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useWorkoutPlan", () => {
  it("returns error when user is not authenticated", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    const { result } = renderHook(() => useWorkoutPlan());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("User not authenticated");
    expect(result.current.workouts).toEqual([]);
  });

  it("returns workouts when authenticated and API returns valid data", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockApi.get = vi.fn().mockResolvedValue({
      data: { workoutPlan: { result: { exercises: sampleWorkouts } } },
    });

    const { result } = renderHook(() => useWorkoutPlan());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.workouts).toEqual(sampleWorkouts);
  });

  it("returns error when authenticated but API returns invalid data", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockApi.get = vi.fn().mockResolvedValue({
      data: { workoutPlan: null },
    });

    const { result } = renderHook(() => useWorkoutPlan());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("No valid workout plan available.");
    expect(result.current.workouts).toEqual([]);
  });

  it("returns error when API call throws", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockApi.get = vi.fn().mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useWorkoutPlan());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch workout plan");
    expect(result.current.workouts).toEqual([]);
  });
});

describe("requestWorkoutPlan", () => {
  it("returns response data on successful POST", async () => {
    const responseData = { plan: "chest day" };
    mockApi.post = vi.fn().mockResolvedValue({ status: 200, data: responseData });

    const result = await requestWorkoutPlan({ goal: "strength" });

    expect(result).toEqual(responseData);
  });

  it("throws when API returns non-200 status", async () => {
    mockApi.post = vi.fn().mockResolvedValue({ status: 400, data: {} });

    await expect(requestWorkoutPlan({ goal: "strength" })).rejects.toThrow(
      "Failed to create workout plan"
    );
  });

  it("throws when API call itself throws", async () => {
    mockApi.post = vi.fn().mockRejectedValue(new Error("Timeout"));

    await expect(requestWorkoutPlan({ goal: "strength" })).rejects.toThrow(
      "Failed to create workout plan"
    );
  });
});
