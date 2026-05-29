package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
)

// App struct
type App struct {
	ctx context.Context
	apiUrl string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.apiUrl = "https://www.speedrun.com/api/v1/";
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Get(endpoint string) ([]byte, error) {
    response, err := http.Get(a.apiUrl + endpoint);

		if err != nil {
        log.Fatal(err)
    }
		defer response.Body.Close()

    body, err := io.ReadAll(response.Body)
    if err != nil {
      return nil, err;
    }
    fmt.Println(string(body))

		return body, nil;
  }

func (a *App) Categories(srcGameId string) []byte {
	requestUrl := fmt.Sprintf("games/%s/categories", srcGameId);
	response, err := a.Get(requestUrl);

	if err != nil {
		return nil;
	}

  return response;
}

func (a *App) Games(id string) []byte {
	requestUrl := fmt.Sprintf("games/%s", id);
	response, err := a.Get(requestUrl);

	if err != nil {
		return nil;
	}

  return response;
}