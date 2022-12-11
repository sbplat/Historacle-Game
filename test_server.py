import requests
import json

session = requests.Session()

r = session.get("http://localhost:5000/get_event")
response = json.loads(r.text)
year = response["year"]
hashed = response["hash"]
length = response["length"]
print(f"Year: {year}")
print(f"Hash: {hashed}")
print(f"Length: {length}")

while True:
    guess = input("Guess: ")
    if len(guess) != length:
        print("Incorrect length")
        continue
    r = session.post("http://localhost:5000/check", json={"hash": hashed, "event": guess})
    print("Sent")
    response = json.loads(r.text)
    if response["correct"]:
        print("Correct!")
        break
    else:
        print("Incorrect")
        correct_indexes = response["correct_indexes"]
        wrong_places = response["wrong_places"]
        print(f"Correct indexes: {correct_indexes}")
        print(f"Wrong places: {wrong_places}")
