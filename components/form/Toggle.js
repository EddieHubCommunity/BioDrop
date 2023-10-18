import { Switch } from "@headlessui/react";
import { classNames } from "@services/utils/classNames";

export default function Toggle({ text1, text2, enabled = false, setEnabled }) {
  let aria = {};
  if (!text1 && !text2) {
    aria = {
      "aria-label": "Enable",
    };
  }
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-secondary-medium" : "bg-primary-low-medium/30",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-medium focus:ring-offset-2",
        )}
        {...aria}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
      {text1 || text2 ? (
        <Switch.Label as="span" className="ml-3 text-sm">
          {text1 && (
            <span className="font-medium text-primary-high dark:text-primary-low">
              {text1}
            </span>
          )}
          {text2 && (
            <span className="text-primary-high dark:text-primary-low">
              {" "}
              ({text2})
            </span>
          )}
        </Switch.Label>
      ) : null}
    </Switch.Group>
  );
}
