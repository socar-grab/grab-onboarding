from typing import Optional
from fastapi import FastAPI, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None


@app.get("/")
def read_root():
    return {"Hello": "world"}


@app.get("/cars")
def get_cars(response: Response):
    with open("cars.json", "r") as cars:
        return json.load(cars)


@app.post("/cars/{car_id}")
def apply_car(car_id: int):
    with open(os.getenv("LOG_PATH", 'volumes/apply_log.txt'), "w") as log_file:
        log_file.write(str({
            'car_id' : car_id
        }))
        return {
            "result": True
        }
