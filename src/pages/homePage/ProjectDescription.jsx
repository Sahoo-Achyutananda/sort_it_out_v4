import styles from "./ProjectDescription.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StackIcon from "tech-stack-icons";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";

function ProjectDescription() {
  const iconSize = { width: "25px", height: "25px" };
  return (
    <div className={styles.ProjectDescription}>
      <div className={styles.ProjectTitle}>
        <h2> About This Project</h2>
        <span>First love gave me butterflies. First project gave me bugs.</span>
      </div>
      <p>
        Welcome to the <strong>SORT IT OUT</strong> — a glorious labor of love,
        caffeine, and chaos. This is a <strong>personal project</strong>, born
        from a late-night impulse to make colorful bars dance to the rhythm of
        algorithms.<strong>Also, this is my first Major Project.</strong> Why i
        made this ?
      </p>
      <p>
        <span>
          <CheckCircleIcon fontSize="small" style={{ color: "white" }} />
          Because watching bars sort themselves is oddly satisfying.
        </span>
        <span>
          <CheckCircleIcon fontSize="small" style={{ color: "white" }} />
          And because visualizing algorithms helps make boring theory slightly
          less boring.
        </span>
        <span>
          <CheckCircleIcon fontSize="small" style={{ color: "white" }} />
          Also, because the idea of Bubble Sort losing to Quick Sort in a
          head-to-head race is hilarious.
        </span>
        <span>
          <CheckCircleIcon fontSize="small" style={{ color: "white" }} />
          Needed a good Project for my resume/portfolio.
        </span>
      </p>

      <h3>📜 Version History</h3>

      <div className={styles.versionCards}>
        {/* Version 1 */}
        <div className={styles.versionCard}>
          <div className={styles.title}>
            <h3>Version 1</h3>
            <p>D.R.Y ? What the hell is that ? 😁</p>
          </div>
          <p>
            {<StackIcon name="css3" style={iconSize} />}
            {<StackIcon name="html5" style={iconSize} />}
            {<StackIcon name="js" style={iconSize} />}
          </p>

          <div className={styles.featureSection}>
            <ul className={styles.included}>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Basic visual representation
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Swap & comparison counts (with flashy blinks!)
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Dark mode only
              </li>
            </ul>
          </div>

          <hr className={styles.divider} />

          <div className={styles.featureSection}>
            <ul className={styles.missing}>
              <li>
                <CancelIcon fontSize="small" style={{ color: "crimson" }} /> No
                timer
              </li>
              <li>
                <CancelIcon fontSize="small" style={{ color: "crimson" }} /> No
                user input or descriptions
              </li>
              <li>
                <CancelIcon fontSize="small" style={{ color: "crimson" }} /> No
                race mode
              </li>
            </ul>
          </div>
          <NavButtons
            live={"https://sorting-visualizer-achyutananda-sahoo.netlify.app/"}
            github={
              "https://github.com/Sahoo-Achyutananda/Sorting_Algorithm_Visualizer"
            }
          />
        </div>

        {/* Version 2 */}
        <div className={styles.versionCard}>
          <div className={styles.title}>
            <h3>Version 2</h3>
            <p>useReducer felt like working with an API 🙂</p>
          </div>
          <p>
            <StackIcon name="css3" style={iconSize} />
            <StackIcon name="html5" style={iconSize} />
            <StackIcon name="js" style={iconSize} />
            <StackIcon name="reactjs" style={iconSize} />
            <StackIcon name="materialui" style={iconSize} />
          </p>

          <div className={styles.featureSection}>
            <ul className={styles.included}>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Timer ⏱️
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Race Mode 🏁
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Descriptive log for each action
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Custom Input
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Updated theme
              </li>
            </ul>
          </div>

          <hr className={styles.divider} />

          <div className={styles.featureSection}>
            <ul className={styles.missing}>
              <li>
                <CancelIcon fontSize="small" style={{ color: "crimson" }} /> No
                timeline scrubbing
              </li>
            </ul>
          </div>

          <NavButtons
            live={"https://sort-it-out-v2-achyutananda-sahoo.netlify.app/"}
            github={"https://github.com/Sahoo-Achyutananda/sort_it_out_v2"}
          />
        </div>

        {/* Version 3 */}

        <div className={`${styles.versionCard}`}>
          <div className={styles.title}>
            <h3>Version 3</h3>
            <p>Sorting bars and raising bars — that's v3.</p>
          </div>
          <p>
            <StackIcon name="css3" style={iconSize} />
            <StackIcon name="html5" style={iconSize} />
            <StackIcon name="js" style={iconSize} />
            <StackIcon name="reactjs" style={iconSize} />
            <StackIcon name="materialui" style={iconSize} />
            <StackIcon name="supabase" style={iconSize} />
          </p>

          <div className={styles.featureSection}>
            <ul className={styles.included}>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                All features from v2
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Video-like timeline control
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Seek forward/backward ⏩⏪
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Live event display
              </li>
              <li>
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "#28a745" }}
                />
                Timer (race mode only)
              </li>
            </ul>
          </div>

          <hr className={styles.divider} />

          <div className={styles.featureSection}>
            <ul className={styles.missing}>
              <li>
                <CancelIcon fontSize="small" style={{ color: "crimson" }} />{" "}
                Timer not available in normal mode
              </li>
            </ul>
          </div>

          <NavButtons
            live={"https://sort-it-out-v3-achyutananda-sahoo.netlify.app/"}
            github={"https://github.com/Sahoo-Achyutananda/sort_it_out_v3"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDescription;

function NavButtons({ live, github }) {
  return (
    <div className={styles.buttons}>
      <button
        className={styles.visitBtn}
        onClick={() => (window.location.href = live)}
      >
        Live Link <OpenInNewIcon fontSize="small" />
      </button>
      <button
        className={styles.githubBtn}
        onClick={() => (window.location.href = github)}
      >
        Github <GitHubIcon fontSize="small" />
      </button>
    </div>
  );
}
