package main

import (
	"log"
	"net/http"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnRecordCreate("entries").BindFunc(func(e *core.RecordEvent) error {
		app.Logger().Debug("OnRecordCreate triggered", "id", e.Record.Id)
		deploy(app)
		return e.Next()
	})

	app.OnRecordUpdate("entries").BindFunc(func(e *core.RecordEvent) error {
		app.Logger().Debug("OnRecordUpdate triggered", "id", e.Record.Id)
		deploy(app)
		return e.Next()
	})

	app.OnRecordDelete("entries").BindFunc(func(e *core.RecordEvent) error {
		app.Logger().Debug("OnRecordDelete triggered", "id", e.Record.Id)
		deploy(app)
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func deploy(app *pocketbase.PocketBase) {
	url := os.Getenv("DEPLOY_HOOK_URL")

	if url == "" {
		app.Logger().Error("DEPLOY_HOOK_URL not set")
		return
	}

	res, err := http.Post(url, "application/json", nil)
	if err != nil {
		app.Logger().Error("deploy error", "error", err.Error())
	}

	app.Logger().Debug("deploy sent", "status", res.Status)
}
