from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mode = "CALM"


@app.post("/set-mode")
async def set_mode(data: dict):
    global mode
    mode = data.get("mode", "CALM")
    return {"mode": mode}


def generate_sensor():
    if mode == "CALM":
        rain = random.uniform(0, 30)
        wind = random.uniform(0, 20)
    elif mode == "WARNING":
        rain = random.uniform(30, 80)
        wind = random.uniform(20, 60)
    else:
        rain = random.uniform(80, 150)
        wind = random.uniform(60, 120)

    return rain, wind


def predict(rain, wind):
    risk = (rain / 150) * 0.6 + (wind / 120) * 0.4

    if risk < 0.3:
        severity = "LOW"
    elif risk < 0.7:
        severity = "MEDIUM"
    else:
        severity = "HIGH"

    return round(risk, 2), severity


def decide(risk):
    if risk < 0.3:
        return "MONITOR"
    elif risk < 0.7:
        return "ALERT"
    else:
        return "EVACUATE"


def explain(rain, wind, risk, action):
    return f"""
Rainfall at {rain:.1f} mm and wind speed {wind:.1f} km/h resulted in a risk score of {risk}.
Based on simulation models, the system selected {action} as the optimal response.
"""


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()

    history = []

    while True:
        rain, wind = generate_sensor()
        risk, severity = predict(rain, wind)
        action = decide(risk)

        history.append(risk)
        trend = "stable"

        if len(history) > 3:
            if history[-1] > history[-2]:
                trend = "increasing"
            elif history[-1] < history[-2]:
                trend = "decreasing"

        confidence = round(random.uniform(0.75, 0.95), 2)

        await ws.send_json({
            "time": datetime.now().strftime("%H:%M:%S"),
            "mode": mode,
            "sensor": {"rain": rain, "wind": wind},
            "prediction": {"risk": risk, "severity": severity},
            "agent": {"action": action},
            "trend": trend,
            "simulation": {"confidence": confidence},
            "explanation": explain(rain, wind, risk, action),
            "alert": action != "MONITOR"
        })

        await asyncio.sleep(1)