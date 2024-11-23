# elasticsearch_setup.py
from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

def create_index(index_name):
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name)

def index_project(project):
    es.index(index='projects', body=project)

def search_projects(query):
    return es.search(index='projects', body={
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title", "abstract", "department"]
            }
        }
    })