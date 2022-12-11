import json
import random
import base64
import time

TIMESTAMP = int(time.time())

with open("./events.json", "r") as f:
    events = json.load(f)

def random_year() -> int:
    """
    Return a random year from the events dictionary.

    Returns:
        int: A random year.
    """
    return random.choice(list(events.keys()))

def random_event(year: int) -> str:
    """
    Return a random event from the given year.

    Args:
        year (int): The year to choose an event from.

    Returns:
        str: A random event.

    Raises:
        KeyError: If the year is not in the events dictionary.
    """
    return random.choice(events[str(year)])

def str_to_int(string: str) -> int:
    """
    Convert a string to an integer.

    Args:
        string (str): The string to convert.

    Returns:
        int: The integer.
    """
    return int.from_bytes(string.encode(), "big")

def int_to_str(integer: int) -> str:
    """
    Convert an integer to a string.

    Args:
        integer (int): The integer to convert.

    Returns:
        str: The string.
    """
    return integer.to_bytes((integer.bit_length() + 7) // 8, "big").decode()

def hash_event(year: int, event: str) -> str:
    """
    Return a reversible hash of the given year and event.

    Args:
        year (int): The year of the event.
        event (str): The event.

    Returns:
        str: A hash of the year and event.
    """
    # Xor with the TIMESTAMP to make it harder to guess
    xor = str_to_int(event) ^ TIMESTAMP
    string = f"{year}:{xor}"
    return base64.b64encode(string.encode()).decode()

def unhash_event(hash: str) -> tuple:
    """
    Return the year and event from the given hash.

    Args:
        hash (str): The hash to unhash.

    Returns:
        tuple: The year and event.
    """
    string = base64.b64decode(hash).decode()
    year, xor = string.split(":")
    event = int_to_str(int(xor) ^ TIMESTAMP)
    return int(year), event

if __name__ == "__main__":
    year = random_year()
    event = random_event(year)
    print(f"{year}: {event}")
    hashed = hash_event(year, event)
    print(hashed)
    print(unhash_event(hashed))
