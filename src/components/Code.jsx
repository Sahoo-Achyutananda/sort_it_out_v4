import styles from "./Code.module.css";
import { CopyBlock, dracula } from "react-code-blocks";
import CodeIcon from "@mui/icons-material/Code";
// import algoInformation from "../Data/data.js";

function Code({ json }) {
  return (
    <div className={styles.code}>
      <span>
        <CodeIcon />
        PseudoCode
      </span>
      <CopyBlock
        language="jsx"
        text={json.code}
        showLineNumbers={true}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
}

export default Code;
