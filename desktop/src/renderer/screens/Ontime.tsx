import { ipc } from "../ipc";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Label } from "@bowser/components/label";
import { Input } from "@bowser/components/input";
import { Button } from "@bowser/components/button";
import { Alert } from "@bowser/components/alert";
import { RadioGroup, RadioGroupItem } from "@bowser/components/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@bowser/components/alert-dialog";
import { Dialog, DialogContent, DialogHeader } from "@bowser/components/dialog";
import { CompleteShowType } from "../../common/types";

export function OntimeSettings() {
  const queryClient = useQueryClient();
  const [status] = ipc.ontime.getConnectionStatus.useSuspenseQuery();
  const [settings] = ipc.ontime.getSettings.useSuspenseQuery();
  const connect = ipc.ontime.connect.useMutation({
    async onSettled() {
      await queryClient.invalidateQueries(
        getQueryKey(ipc.ontime.getConnectionStatus),
      );
      await queryClient.invalidateQueries(getQueryKey(ipc.ontime.getSettings));
    },
  });

  return (
    <div>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const values = new FormData(e.currentTarget);
          connect.mutate({
            host: values.get("host") as string,
          });
        }}
      >
        <div>
          <Label htmlFor="host">Ontime Host</Label>
          <Input
            id="host"
            name="host"
            type="text"
            defaultValue={settings?.host}
            placeholder="http://localhost:4001"
          />
        </div>
        <Button type="submit" color={status !== null ? "ghost" : "primary"}>
          Connect
        </Button>
        {connect.error && (
          <Alert variant="danger">{connect.error.message}</Alert>
        )}
        {status !== null && (
          <Alert>
            Connected to Ontime at <code>{status.host}</code>
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
  const ontimePush = ipc.ontime.pushEvents.useMutation({
    onSuccess() {
      props.setDialogOpen(false);
    },
  });

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
                ontimePush.mutate({
                  rundownId:
                    rundownId === "all"
                      ? undefined
                      : parseInt(rundownId as string, 10),
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
            {ontimePush.isError && (
              <Alert variant="danger">
                Push failed: {ontimePush.error.message}
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {ontimePush.isSuccess && !ontimePush.data.done && (
        <AlertDialog open={true} onOpenChange={() => ontimePush.reset()}>
          <AlertDialogContent>
            <AlertDialogDescription>
              There are already events present in Ontime. Would you like to
              replace them?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  ontimePush.mutate({
                    rundownId: ontimePush.variables!.rundownId,
                    replacementMode: "force",
                  })
                }
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
