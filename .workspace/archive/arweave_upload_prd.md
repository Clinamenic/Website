## High Level Functionality

I want to have a process for systematically and comprehensively uploading my files to Arweave and indexing them in such a way that enables version history. I would like to be able to view the hashes and timestamps of the various versions of a document uploaded to Arweave, and I would like this information neatly structured in a json.

## Initial Specification of Process

1. Process all .md files in the website which have 'publish: true' and 'uuid: [value]' in their frontmatter.

2. Index these files into @arweave_index.json located in data/. Create this json if it does not already exist.

3. For each UUID in the json, include also the value found in each files 'title:' frontmatter field, as shown below:

```json
{
  "files": [
    {
      "uuid": "245497b4-8ced-46b3-a841-d8e683c09373",
      "title": "A Rhapsody on Neurodiversity",
      "arweave_hashes": []
    }
  ]
}
```

4.

```json
{
  "files": [
    {
      "uuid": "245497b4-8ced-46b3-a841-d8e683c09373",
      "title": "A Rhapsody on Neurodiversity",
      "arweave_hashes": [
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time1>"
        },
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time2>"
        },
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time3>"
        }
      ]
    }
  ]
}
```

```json
{
  "files": [
    {
      "uuid": "245497b4-8ced-46b3-a841-d8e683c09373",
      "title": "A Rhapsody on Neurodiversity",
      "arweave_hashes": [
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time1>"
        },
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time2>"
        },
        {
          "hash": "A1BQ7QUEnQ5I6W-o-ot4GB0w832OkR0LbNAjtqPX_GQ",
          "timestamp": "<time3>"
        }
      ]
    }
  ]
}
```
