import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Save, Plus, Trash2, Edit3, Search, FileText } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('ecotravel_notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Error parsing saved notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('ecotravel_notes', JSON.stringify(notes));
  }, [notes]);

  // Auto-save current note
  useEffect(() => {
    if (isEditing && currentNote && (title || content)) {
      const timeoutId = setTimeout(() => {
        handleSaveNote();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [title, content, tags]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
    };
    
    setCurrentNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
    setTags(newNote.tags);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (!currentNote) return;

    setSaveStatus('saving');

    const updatedNote: Note = {
      ...currentNote,
      title: title.trim() || 'Untitled Note',
      content,
      tags,
      updatedAt: new Date().toISOString(),
    };

    const existingNoteIndex = notes.findIndex(note => note.id === currentNote.id);
    
    if (existingNoteIndex >= 0) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = updatedNote;
      setNotes(updatedNotes);
    } else {
      // Add new note
      setNotes(prev => [updatedNote, ...prev]);
    }

    setCurrentNote(updatedNote);
    setSaveStatus('saved');
    
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
      setIsEditing(false);
      setTitle('');
      setContent('');
      setTags([]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Remove quill modules since we're using textarea instead

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-primary/5 to-nature-accent/5 pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 safe-area-top">
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            <FileText className="inline-block mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-nature-accent" />
            My Travel Notes
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-4">
            Capture your eco-travel thoughts, plans, and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            <Card>
              <CardHeader className="pb-3 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Notes ({notes.length})</CardTitle>
                  <Button onClick={handleNewNote} size="sm" className="touch-target">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">New</span>
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                  {filteredNotes.length === 0 ? (
                    <div className="p-4 sm:p-6 text-center text-muted-foreground">
                      {notes.length === 0 ? (
                        <>
                          <FileText className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 opacity-30" />
                          <p className="text-sm sm:text-base">No notes yet. Create your first note!</p>
                        </>
                      ) : (
                        <p className="text-sm sm:text-base">No notes match your search.</p>
                      )}
                    </div>
                  ) : (
                    filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors group ${
                          currentNote?.id === note.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleEditNote(note)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{note.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {note.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {note.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {note.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{note.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(note.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(note.id);
                            }}
                            className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {isEditing ? (
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base sm:text-lg font-medium border-none p-0 focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:flex-shrink-0">
                      {saveStatus === 'saving' && (
                        <span className="text-xs sm:text-sm text-muted-foreground">Saving...</span>
                      )}
                      {saveStatus === 'saved' && (
                        <span className="text-xs sm:text-sm text-green-600">Saved!</span>
                      )}
                      <Button onClick={handleSaveNote} size="sm" className="touch-target">
                        <Save className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Save</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer text-xs touch-target"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        className="flex-1 text-sm"
                      />
                      <Button onClick={handleAddTag} size="sm" variant="outline" className="touch-target">
                        <span className="hidden sm:inline">Add</span>
                        <Plus className="h-4 w-4 sm:hidden" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="min-h-64 sm:min-h-96">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start writing your note..."
                      className="notes-textarea min-h-60 sm:min-h-80 w-full border rounded-md p-3 text-sm sm:text-base"
                      rows={15}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-64 sm:h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground p-4">
                  <Edit3 className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                  <h3 className="text-lg sm:text-xl font-medium mb-2">Select a note to edit</h3>
                  <p className="text-sm sm:text-base mb-4">Choose a note from the list or create a new one to get started</p>
                  <Button onClick={handleNewNote} className="touch-target">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Note
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Stats */}
        <Card className="mt-4 sm:mt-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-nature-accent">{notes.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Notes</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {notes.reduce((acc, note) => acc + note.content.length, 0)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Characters Written</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {[...new Set(notes.flatMap(note => note.tags))].length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Unique Tags</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotesSection;