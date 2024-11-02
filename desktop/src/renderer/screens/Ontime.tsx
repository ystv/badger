import { Label } from "@badger/components/label";
import { Input } from "@badger/components/input";
import { Button } from "@badger/components/button";
import { Alert } from "@badger/components/alert";
import { RadioGroup, RadioGroupItem } from "@badger/components/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@badger/components/alert-dialog";
import { Dialog, DialogContent, DialogHeader } from "@badger/components/dialog";
import { CompleteShowType } from "../../common/types";
import { dispatch, useAppSelector } from "../store";
import { useRef, useState } from "react";

export function OntimeSettings() {
  const { connected, host, connectionError } = useAppSelector(
    (state) => state.ontime,
  );
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const values = new FormData(e.currentTarget);
          setIsConnecting(true);
          dispatch
            .connectToOntime({
              serverURL: values.get("host") as string,
            })
            .finally(() => {
              setIsConnecting(false);
            });
        }}
      >
        <div>
          <Label htmlFor="host">Ontime Host</Label>
          <Input
            id="host"
            name="host"
            type="text"
            defaultValue={"http://localhost:4001"}
            placeholder="http://localhost:4001"
          />
        </div>
        <Button
          type="submit"
          color={connected ? "ghost" : "primary"}
          disabled={isConnecting}
        >
          Connect
        </Button>
        {connectionError && <Alert variant="danger">{connectionError}</Alert>}
        {connected && (
          <Alert>
            Connected to Ontime at <code>{host}</code>
          </Alert>
        )}
      </form>
    </div>
  );
}

export function OntimePush(props: {
  show: {
    rundowns: CompleteShowType["rundowns"];
    continuityItems: CompleteShowType["continuityItems"];
  };
  dialogOpen: boolean;
  setDialogOpen: (v: boolean) => unknown;
}) {
  const lastPushTarget = useRef<string | null>(null);
  const [needsForce, setNeedsForce] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  return (
    <>
      <Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
        <DialogContent>
          <DialogHeader className="text-3xl">Push to Ontime</DialogHeader>
          <div className="space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const rundownId = data.get("select-rundown");
                if (!rundownId) {
                  return;
                }
                lastPushTarget.current = rundownId as string;
                dispatch
                  .pushEvents({
                    rundownID:
                      rundownId === "all"
                        ? undefined
                        : parseInt(rundownId as string, 10),
                  })
                  .unwrap()
                  .then((v) => {
                    if (!v.done) {
                      setNeedsForce(true);
                    }
                  })
                  .catch((e) => {
                    setPushError(e.message);
                  });
              }}
            >
              <Label htmlFor="select-rundown">
                Which rundown would you like to push?
              </Label>
              <RadioGroup id="select-rundown" name="select-rundown">
                <div>
                  <RadioGroupItem value="all" id="push-all" />
                  <Label htmlFor="push-all">Entire show</Label>
                </div>
                {props.show.rundowns.map((rd) => (
                  <div key={rd.id}>
                    <RadioGroupItem
                      value={rd.id.toString(10)}
                      id={`push-${rd.id}`}
                    />
                    <Label htmlFor="push-all">{rd.name}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button type="submit" color="primary">
                Push
              </Button>
            </form>
          </div>
          <div>
            {pushError && (
              <Alert variant="danger">Push failed: {pushError}</Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {needsForce && (
        <AlertDialog open={needsForce}>
          <AlertDialogContent>
            <AlertDialogDescription>
              There are already events present in Ontime. Would you like to
              replace them?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  dispatch
                    .pushEvents({
                      rundownID:
                        lastPushTarget.current === "all"
                          ? undefined
                          : parseInt(lastPushTarget.current!, 10),
                      replacementMode: "force",
                    })
                    .unwrap()
                    .catch((e) => {
                      setPushError(e.message);
                    })
                    .finally(() => {
                      setNeedsForce(false);
                    });
                }}
              >
                Replace
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
