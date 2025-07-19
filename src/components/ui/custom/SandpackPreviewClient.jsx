import { ActionContext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

function SandpackPreviewClient() {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action } = useContext(ActionContext);

  useEffect(() => {
    if (sandpack && action?.actionType) {
      handleAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action?.actionType, sandpack]); // only re-run when actionType or sandpack changes

  const handleAction = async () => {
    const client = previewRef.current?.getClient?.();
    if (!client) return;

    try {
      const result = await client.getCodeSandboxURL();

      if (action?.actionType === "deploy") {
        window.open(`https://${result?.sandboxId}.csb.app/`, "_blank");
      } else if (action?.actionType === "export") {
        window.open(result?.editorUrl, "_blank");
      }
    } catch (err) {
      console.error("Error interacting with Sandpack client:", err);
    }
  };

  return (
    <div className="w-full">
      <SandpackPreview
        ref={previewRef}
        showNavigator
        style={{
          height: "77vh",
          width: "100%",
        }}
      />
    </div>
  );
}

export default SandpackPreviewClient;
