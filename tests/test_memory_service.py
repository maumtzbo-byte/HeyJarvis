from unittest.mock import MagicMock, patch

import pytest

from app.services.memory_service import create_memory


@patch("app.services.memory_service.get_chroma_collection")
@patch("app.services.memory_service.get_supabase_client")
@patch("app.services.memory_service.summarize_memory")
def test_create_memory_rolls_back_supabase_row_when_chroma_fails(
    mock_summarize, mock_supabase_client, mock_chroma_collection
):
    """If the ChromaDB embedding write fails after the Supabase row was already
    inserted, the row must be deleted again — otherwise it lingers in Supabase
    and shows up in the dashboard, but can never be found by /query since it
    has no embedding."""
    mock_summarize.return_value = ("Meeting with Carlos Thursday", None)

    mock_table = MagicMock()
    mock_supabase_client.return_value.table.return_value = mock_table
    mock_table.insert.return_value.execute.return_value = None
    mock_table.delete.return_value.eq.return_value.execute.return_value = None

    mock_chroma_collection.return_value.add.side_effect = RuntimeError("chroma is down")

    with pytest.raises(RuntimeError):
        create_memory("test-user", "Remind me I'm meeting Carlos Thursday")

    mock_table.insert.assert_called_once()
    mock_table.delete.assert_called_once()
    mock_table.delete.return_value.eq.assert_called_once_with(
        "id", mock_table.insert.call_args[0][0]["id"]
    )


@patch("app.services.memory_service.get_chroma_collection")
@patch("app.services.memory_service.get_supabase_client")
@patch("app.services.memory_service.summarize_memory")
def test_create_memory_succeeds_when_both_writes_succeed(
    mock_summarize, mock_supabase_client, mock_chroma_collection
):
    mock_summarize.return_value = ("Meeting with Carlos Thursday", None)
    mock_table = MagicMock()
    mock_supabase_client.return_value.table.return_value = mock_table

    memory_id, summary, reminder_at = create_memory(
        "test-user", "Remind me I'm meeting Carlos Thursday"
    )

    assert summary == "Meeting with Carlos Thursday"
    assert reminder_at is None
    assert memory_id
    mock_chroma_collection.return_value.add.assert_called_once()
    mock_table.delete.assert_not_called()
