import * as express from "express"

export interface AppCreator{
    initializeServer() : void
}