import WarningIcon from "@mui/icons-material/Warning";
import Tile from "../Tile";

function Uncompleted() {
  return (
    <Tile>
      <div>
        <div className="flex items-center">
          <WarningIcon className="mr-3 text-yellow-600 dark:text-yellow-400" />
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
            Complete your profile
          </p>
        </div>
        <p className="text-sm mt-1 text-light-text-secondary dark:text-dark-text-secondary">
          You haven't completed the onboarding process yet.{" "}
          <a href="/onboarding" className={`underline  hover:opacity-80`}>
            Complete setup
          </a>
        </p>
      </div>
    </Tile>
  );
}

export default Uncompleted;
