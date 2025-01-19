from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/nested_tags_tree"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class TreeNode(Base):
    __tablename__ = "trees"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(JSON)

Base.metadata.create_all(bind=engine)

class TreeNodeModel(BaseModel):
    id: Optional[int]
    name: str
    children: Optional[List['TreeNodeModel']]
    data: Optional[str]

TreeNodeModel.update_forward_refs()

@app.post("/trees", response_model=TreeNodeModel)
def create_tree(tree: TreeNodeModel):
    db = SessionLocal()
    db_tree = TreeNode(data=tree.dict())
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    return db_tree.data

@app.get("/trees", response_model=List[TreeNodeModel])
def read_trees():
    db = SessionLocal()
    trees = db.query(TreeNode).all()
    return [tree.data for tree in trees]

@app.put("/trees/{tree_id}", response_model=TreeNodeModel)
def update_tree(tree_id: int, tree: TreeNodeModel):
    db = SessionLocal()
    db_tree = db.query(TreeNode).filter(TreeNode.id == tree_id).first()
    if db_tree is None:
        raise HTTPException(status_code=404, detail="Tree not found")
    db_tree.data = tree.dict()
    db.commit()
    db.refresh(db_tree)
    return db_tree.data

@app.get("/")
def read_root():
    return {"message": "Nested Tags Tree API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

