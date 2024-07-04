package main

import (
	"context"
	"fmt"
)

func main() {
	// unbufferedChanel()
	// baseDefault()
	// baseSelect()
	// graceFulShutdown()
	baseKnowledge()
}


// func baseSelect() {


// 	resultChan := make(chan int)
// 	timer := time.After(time.Second)

// 	go func() {
// 		defer close(resultChan)
// 		for i := 0; i < 1000; i++ {
// 			select {
// 			case <- timer:
// 				fmt.Println("time's up")
// 				return
// 			default:
// 				time.Sleep(time.Nanosecond)
// 				resultChan <- i
// 			}
// 		}
// 	}()
// 	for v := range resultChan {
// 		fmt.Println(v)
// 	}

// }


func baseKnowledge() {
	ctx := context.Background()
	fmt.Println(ctx)

	td := context.TODO()
	fmt.Println(td)

	withValue := context.WithValue(ctx, 1, "Vasya")
	fmt.Println(withValue.Value(1))

	withCancel, cancel := context.WithCancel(ctx)
	fmt.Println(withCancel.Err())
	cancel()
	fmt.Println(withCancel.Err())
}