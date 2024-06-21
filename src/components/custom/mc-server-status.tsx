import { useState, useEffect } from "react";
import { CheckIcon, CopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { useMinecraftServerStatus } from "@/reducers";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function MineServerStatus() {
  const { toast } = useToast();

  const {
    state,
    setMcServerJavaResponse,
    setMcServerBedrockResponse,
    resetResponses,
  } = useMinecraftServerStatus();
  const { mcServerJavaResponse, mcServerBedrockResponse } = state;

  const [refreshState, setRefreshState] = useState(false);
  const [javaServerUrlCopied, setJavaServerUrlCopied] = useState(false);
  const [bedrockServerUrlCopied, setBedrockServerUrlCopied] = useState(false);

  const checkServerStatus = async (url: string, setResponse: any) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const asynchrounouslyCheckBothServerStatus = async () => {
    await Promise.all([
      checkServerStatus(
        "https://api.mcstatus.io/v2/status/java/mc.irvanma.eu.org",
        setMcServerJavaResponse
      ),
      checkServerStatus(
        "https://api.mcstatus.io/v2/status/bedrock/mc.irvanma.eu.org",
        setMcServerBedrockResponse
      ),
    ]);
  };

  useEffect(() => {
    asynchrounouslyCheckBothServerStatus();
  }, [refreshState]);

  const serverStatusCheck = (status: boolean | string) => {
    if (status === true) {
      return "ONLINE";
    } else if (status === false) {
      return "OFFLINE";
    } else {
      return "CHECKING";
    }
  };

  const copyToClipboard = async (
    text: string,
    setStatus: (status: boolean) => void
  ) => {
    await navigator.clipboard.writeText(text);
    setStatus(true);
  };

  const handleCopyJava = async () => {
    await copyToClipboard(
      `${mcServerJavaResponse?.host}:${mcServerJavaResponse?.port}`,
      setJavaServerUrlCopied
    );
    toast({
      title: "Copied to clipboard!",
      description: "Java server URL copied to clipboard.",
    });
    const timeout = setTimeout(() => {
      setJavaServerUrlCopied(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const handleCopyBedrock = async () => {
    await copyToClipboard(
      `${mcServerBedrockResponse?.host}:${mcServerBedrockResponse?.port}`,
      setBedrockServerUrlCopied
    );
    toast({
      title: "Copied to clipboard!",
      description: "Bedrock server URL copied to clipboard.",
    });
    const timeout = setTimeout(() => {
      setBedrockServerUrlCopied(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const handleRefresh = () => {
    resetResponses();
    setRefreshState(!refreshState);
    toast({
      title: "Refreshing server status...",
      description: "Refreshing server status...",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
        <div className="py-3 w-fulls rounded-lg border border-border bg-card">
          <div className="mb-3 px-5 flex items-center gap-5 justify-between">
            <h2 className="font-semibold dark:font-medium w-full line-clamp-1">
              Java Server
            </h2>
            <div className="flex items-center justify-center px-2 py-1 gap-2 border border-border rounded-full">
              <div className="w-2 h-2 relative">
                <div
                  className={cn(`w-2 h-2 bg-primary absolute rounded-full`, {
                    "bg-red-600 dark:bg-red-500":
                      mcServerJavaResponse?.online === false,
                    "bg-yellow-600 dark:bg-yellow-500":
                      mcServerJavaResponse?.online === "CHECKING",
                    "bg-primary": mcServerJavaResponse?.online === true,
                  })}
                />
                <div
                  className={cn(
                    `w-2 h-2 bg-primary absolute rounded-full animate-ping`,
                    {
                      "bg-red-600 dark:bg-red-500":
                        mcServerJavaResponse?.online === false,
                      "bg-yellow-600 dark:bg-yellow-500":
                        mcServerJavaResponse?.online === "CHECKING",
                      "bg-primary": mcServerJavaResponse?.online === true,
                    }
                  )}
                />
              </div>
              <p className="text-xs leading-none font-mono">
                {serverStatusCheck(mcServerJavaResponse?.online)}
              </p>
            </div>
          </div>
          <Separator />
          <p className="w-full px-5 pt-3">Version: 1.21</p>
          <p className="w-full px-5 pt-1">
            Host Address: {mcServerJavaResponse?.host}
          </p>
          <p className="w-full px-5 pt-1">Port: {mcServerJavaResponse?.port}</p>
          <div className="mt-3 px-5">
            <Button
              className="flex items-center justify-center w-full gap-3"
              variant={"secondary"}
              onClick={handleCopyJava}
            >
              {javaServerUrlCopied ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
              <span>{javaServerUrlCopied ? "Copied!" : "Copy URL"}</span>
              <span className="sr-only">
                Copy the Java server URL to clipboard
              </span>
            </Button>
          </div>
        </div>
        <div className="py-3 w-fulls rounded-lg border border-border bg-card">
          <div className="mb-3 px-5 flex items-center gap-5 justify-between">
            <h2 className="font-semibold dark:font-medium w-full line-clamp-1">
              Bedrock Server
            </h2>
            <div className="flex items-center justify-center px-2 py-1 gap-2 border border-border rounded-full">
              <div className="w-2 h-2 relative">
                <div
                  className={cn(`w-2 h-2 bg-primary absolute rounded-full`, {
                    "bg-red-600 dark:bg-red-500":
                      mcServerBedrockResponse?.online === false,
                    "bg-yellow-600 dark:bg-yellow-500":
                      mcServerBedrockResponse?.online === "CHECKING",
                    "bg-primary": mcServerBedrockResponse?.online === true,
                  })}
                />
                <div
                  className={cn(
                    `w-2 h-2 bg-primary absolute rounded-full animate-ping`,
                    {
                      "bg-red-600 dark:bg-red-500":
                        mcServerBedrockResponse?.online === false,
                      "bg-yellow-600 dark:bg-yellow-500":
                        mcServerBedrockResponse?.online === "CHECKING",
                      "bg-primary": mcServerBedrockResponse?.online === true,
                    }
                  )}
                />
              </div>
              <p className="text-xs leading-none font-mono">
                {serverStatusCheck(mcServerBedrockResponse?.online)}
              </p>
            </div>
          </div>
          <Separator />
          <p className="w-full px-5 pt-3">Version: 1.21 (Geyser)</p>
          <p className="w-full px-5 pt-1">
            Host Address: {mcServerBedrockResponse?.host}
          </p>
          <p className="w-full px-5 pt-1">
            Port: {mcServerBedrockResponse?.port}
          </p>
          <div className="mt-3 px-5">
            <Button
              className="flex items-center justify-center w-full gap-3"
              variant={"secondary"}
              onClick={handleCopyBedrock}
            >
              {bedrockServerUrlCopied ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
              <span>{bedrockServerUrlCopied ? "Copied!" : "Copy URL"}</span>
              <span className="sr-only">
                Copy the Bedrock server URL to clipboard
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="flex items-center justify-center gap-3"
        onClick={handleRefresh}
      >
        <ReloadIcon className="w-5 h-5" />
        <span>Refresh Server Status</span>
      </Button>
    </>
  );
}

export default MineServerStatus;
