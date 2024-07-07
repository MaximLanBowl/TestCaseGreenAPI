package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GreenAPIResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"string"`
	Data    interface{} `json:"data"`
}

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.POST("/getSettings", func(c *gin.Context) {
		idInstance := c.PostForm("idInstance")
		apiTokenInstance := c.PostForm("apiTokenInstance")

		resp, err := getSettings(idInstance, apiTokenInstance)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, resp)
	})

	r.POST("/sendMessage", func(c *gin.Context) {
		idInstance := c.PostForm("idInstance")
		apiTokenInstance := c.PostForm("apiTokenInstance")
		phoneNumber := c.PostForm("phoneNumber")
		message := c.PostForm("message")

		resp, err := sendMessage(idInstance, apiTokenInstance, phoneNumber, message)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, resp)
	})

	r.Run()
}

func getSettings(idInstance, apiTokenInstance string) (*GreenAPIResponse, error) {
	url := fmt.Sprintf("https://api.green-api.com/waInstance/%s/getSettings", idInstance)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiTokenInstance))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var greenAPIResp GreenAPIResponse
	err = json.Unmarshal(body, &greenAPIResp)
	if err != nil {
		return nil, err
	}

	return &greenAPIResp, nil
}

func sendMessage(idInstance, apiTokenInstance, phoneNumber, message string) (*GreenAPIResponse, error) {
	url := fmt.Sprintf("https://api.green-api.com/waInstance/%s/sendMessage", idInstance)

	data := map[string]interface{}{
		"chatId":  fmt.Sprintf("%s@c.us", phoneNumber),
		"message": message,
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiTokenInstance))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var greenAPIResp GreenAPIResponse
	err = json.Unmarshal(body, &greenAPIResp)
	if err != nil {
		return nil, err
	}

	return &greenAPIResp, nil
}
