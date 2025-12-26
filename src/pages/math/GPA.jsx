import { createSignal, createMemo, For } from "solid-js";
import Input from "../../components/Input";

export default function GPACalculator() {
  const [courses, setCourses] = createSignal([
    { name: "Course 1", grade: "4.0", credits: 3 },
    { name: "Course 2", grade: "3.5", credits: 3 },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses(),
      { name: `Course ${courses().length + 1}`, grade: "4.0", credits: 3 },
    ]);
  };

  const removeCourse = (index) => {
    setCourses(courses().filter((_, i) => i !== index));
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses()];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const result = createMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses().forEach((c) => {
      totalPoints += parseFloat(c.grade) * parseFloat(c.credits);
      totalCredits += parseFloat(c.credits);
    });
    return totalCredits === 0
      ? "0.00"
      : (totalPoints / totalCredits).toFixed(2);
  });

  return (
    <div class="max-w-4xl flex flex-col gap-8 text-white">
      <h1 class="text-3xl font-bold">GPA Calculator</h1>

      <div class="grid md:grid-cols-[1fr_300px] gap-8 items-start">
        <div class="flex flex-col gap-4">
          <div class="bg-surface rounded-xl border border-border-subtle overflow-hidden">
            <table class="w-full text-left">
              <thead class="bg-background text-[10px] text-gray-500 uppercase font-bold border-b border-border-subtle text-center">
                <tr>
                  <th class="p-4">Course Name</th>
                  <th class="p-4 w-32">Grade (4.0)</th>
                  <th class="p-4 w-32">Credits</th>
                  <th class="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
                <For each={courses()}>
                  {(course, i) => (
                    <tr class="border-b border-white/5">
                      <td class="p-2">
                        <Input
                          label="Course Name"
                          labelClass="sr-only"
                          type="text"
                          value={course.name}
                          onInput={(e) =>
                            updateCourse(i(), "name", e.currentTarget.value)
                          }
                          inputClass="bg-transparent border-none p-2"
                        />
                      </td>
                      <td class="p-2">
                        <Input
                          label="Grade"
                          labelClass="sr-only"
                          type="number"
                          step="0.1"
                          value={course.grade}
                          onInput={(e) =>
                            updateCourse(i(), "grade", e.currentTarget.value)
                          }
                          inputClass="text-center p-2"
                        />
                      </td>
                      <td class="p-2">
                        <Input
                          label="Credits"
                          labelClass="sr-only"
                          type="number"
                          value={course.credits}
                          onInput={(e) =>
                            updateCourse(i(), "credits", e.currentTarget.value)
                          }
                          inputClass="text-center p-2"
                        />
                      </td>
                      <td class="p-2 text-center">
                        <button
                          onClick={() => removeCourse(i())}
                          class="material-symbols-outlined text-gray-600 hover:text-red-400 align-middle"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
            <button
              onClick={addCourse}
              class="w-full p-4 text-sm font-bold text-primary hover:bg-primary/5 transition-colors border-t border-border-subtle flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">add</span>
              Add Course
            </button>
          </div>
        </div>

        <div class="bg-surface p-8 rounded-xl border border-border-subtle text-center shadow-2xl flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="text-xs text-gray-500 uppercase font-bold">
              Cumulative GPA
            </div>
            <div class="text-7xl font-black text-primary mb-2">{result()}</div>
          </div>
          <div class="h-2 w-full bg-background rounded-full overflow-hidden">
            <div
              class="h-full bg-primary"
              style={{ width: `${(parseFloat(result()) / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
