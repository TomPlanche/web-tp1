import "./NewProjectForm.scss";
import {type ChangeEvent, useState} from "react";
import EmojiPicker, {Theme} from "emoji-picker-react";
import type {TProject} from ".";
import {useProjectsStoreSelector} from "../../stores/hooks/projectsStoreHooks.ts";
import Pill, {getTagVariant} from "../Pill";
import {addProject, projectsStore} from "../../stores/projectsStore.ts";
import {v4 as uuidv4} from "uuid";

const NewProjectForm = () => {
  // States
  const [icon, setIcon] = useState<string>("💻");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const suggestions = useProjectsStoreSelector((state) => {
    return [...new Set(
      state.value.flatMap(project => project.tags || [])
    )]
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    tag => !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(tagInput.toLowerCase())
  );

  const [project, setProject] = useState<TProject>({
    id: "",
    title: "",
    description: "",
    icon: undefined,
    tags: undefined,
    link: undefined,
  });


  // Methods
  const isFormValid = () => {
    return (
      project.title.trim() !== "" &&
      project.title.length <= 30 &&
      project.description.trim() !== "" &&
      project.description.length <= 200
    );
  };

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setIcon(emoji.emoji);
    setProject((prev) => ({
      ...prev,
      icon: emoji.emoji,
    }));
    setShowEmojiPicker(false);
  }


  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setProject((prev) => ({
      ...prev,
      title,
    }));
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    setProject((prev) => ({
      ...prev,
      description,
    }));
  }

  const handleLinkInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const link = event.target.value;

    setProject((prev) => ({
      ...prev,
      link
    }))
  }

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowSuggestions(true);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setProject(prev => ({
        ...prev,
        tags: [...selectedTags, tag]
      }));
    }
    setTagInput("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    setProject(prev => ({
      ...prev,
      tags: selectedTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    const finalProject = {
      ...project,
      id: uuidv4(),
    } as TProject;

    projectsStore.dispatch(addProject(finalProject));

    // Clear all inputs
    setIcon("💻");
    setProject({
      id: "",
      title: "",
      description: "",
      icon: undefined,
      tags: undefined,
      link: undefined,
    });
    setSelectedTags([]);
    setTagInput("");

    for (const selector of [".description-input", ".title-input", ".title-link"]) {
      const input = document.querySelector(selector) as HTMLInputElement;
      if (input) {
        input.value = "";
      }
    }

  }

  return (
    <div className="new-project">
      <h1>Add a new project</h1>

      <div className="form">
        <div className="row">
          <div className="emoji-picker-container">
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {icon}
            </button>

            {showEmojiPicker && (
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={Theme.DARK}
                className="emoji-picker"
              />
            )}
          </div>

          <input
            type="text"
            className="title-input"
            placeholder="Project title"
            maxLength={30}
            required

            onChange={handleTitleChange}
            onFocus={(e) => e.target.select()}
          />
        </div>

        <div className="column">
          <h3>Description</h3>
          <textarea
            className="description-input"
            placeholder="Project description"
            maxLength={200}
            rows={5}
            autoCapitalize={"sentences"}
            spellCheck
            wrap="hard"
            onChange={handleDescriptionChange}
            required
          />
        </div>

        <div className="column">
          <h3>Link</h3>
          <input
            type="text"
            className="title-link"
            placeholder="Project's link"
            required

            onChange={handleLinkInputChange}
            onFocus={(e) => e.target.select()}
          />
        </div>

        <div className="column">
          <h3>Tags</h3>

          <div className="tags-input-container">
            <div className="selected-tags">
              {selectedTags.map(tag => (
                <div key={tag} className="tag-item">
                  <Pill label={tag} variant={getTagVariant(tag)}/>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="tag-input-wrapper">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInput}
                placeholder="Add tags..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && tagInput) {
                    addTag(tagInput);
                  }
                }}
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {filteredSuggestions.map(suggestion => (
                    <div
                      key={suggestion}
                      className="suggestion-item"
                      onClick={() => addTag(suggestion)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          addTag(suggestion);
                        }
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          id="submit"
          type="submit"
          disabled={!isFormValid()}
          onClick={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleSubmit();
            }
          }}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default NewProjectForm;