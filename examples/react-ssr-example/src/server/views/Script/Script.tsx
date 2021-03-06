import * as React from "react";

interface ScriptProps {
    src: string | string[];
}

/**
 * Renders Script tags from an array
 * @param props
 */
const Script = (props: ScriptProps) => {
    if (typeof props.src === "string") {
        return <script type="text/javascript" src={props.src} />;
    }
    const files = props.src
        ? props.src.map((src, index) => (
              <script key={index} type="text/javascript" src={src} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
};

export default Script;
