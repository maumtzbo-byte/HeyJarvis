from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from app.services.claude_service import generate_answer, summarize_memory


def _tool_use_message(input_data: dict):
    tool_use_block = SimpleNamespace(type="tool_use", input=input_data)
    return SimpleNamespace(content=[tool_use_block])


@patch("app.services.claude_service._get_client")
def test_summarize_memory_returns_summary_without_reminder(mock_get_client):
    mock_client = MagicMock()
    mock_client.messages.create.return_value = _tool_use_message(
        {"summary": "Wifi password is sunset-2847", "reminder_at": None}
    )
    mock_get_client.return_value = mock_client

    summary, reminder_at = summarize_memory("The office wifi password is sunset-2847")

    assert summary == "Wifi password is sunset-2847"
    assert reminder_at is None


@patch("app.services.claude_service._get_client")
def test_summarize_memory_extracts_reminder_time(mock_get_client):
    mock_client = MagicMock()
    mock_client.messages.create.return_value = _tool_use_message(
        {
            "summary": "Meeting with Carlos on Thursday at 3pm",
            "reminder_at": "2026-07-30T15:00:00-06:00",
        }
    )
    mock_get_client.return_value = mock_client

    summary, reminder_at = summarize_memory(
        "Remind me I'm meeting Carlos Thursday at 3pm"
    )

    assert summary == "Meeting with Carlos on Thursday at 3pm"
    assert reminder_at == "2026-07-30T15:00:00-06:00"


@patch("app.services.claude_service._get_client")
def test_summarize_memory_treats_missing_reminder_key_as_none(mock_get_client):
    mock_client = MagicMock()
    mock_client.messages.create.return_value = _tool_use_message(
        {"summary": "Bought milk"}
    )
    mock_get_client.return_value = mock_client

    _, reminder_at = summarize_memory("I bought milk today")

    assert reminder_at is None


def _text_message(text: str):
    return SimpleNamespace(content=[SimpleNamespace(text=text)])


@patch("app.services.claude_service._get_client")
def test_generate_answer_without_preferences_uses_base_instructions(mock_get_client):
    mock_client = MagicMock()
    mock_client.messages.create.return_value = _text_message("Thursday at 3pm.")
    mock_get_client.return_value = mock_client

    generate_answer("When is my meeting?", ["Meeting with Carlos on Thursday at 3pm"])

    prompt = mock_client.messages.create.call_args.kwargs["messages"][0]["content"]
    assert "speaking style" not in prompt


@patch("app.services.claude_service._get_client")
def test_generate_answer_with_preferences_adds_style_instructions(mock_get_client):
    mock_client = MagicMock()
    mock_client.messages.create.return_value = _text_message("Thursday at 3pm.")
    mock_get_client.return_value = mock_client

    generate_answer(
        "When is my meeting?",
        ["Meeting with Carlos on Thursday at 3pm"],
        tone="warm and friendly",
        voice_style="encouraging coach",
    )

    prompt = mock_client.messages.create.call_args.kwargs["messages"][0]["content"]
    assert "tone: warm and friendly" in prompt
    assert "personality: encouraging coach" in prompt
