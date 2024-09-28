

import java.util.ArrayList;

class ReverseNode {
	String value;
	int index;
	boolean visited = false;
	boolean traversed = false;
	boolean end = false;

	// Constructor
	ReverseNode(String value, boolean traversed) {
		this.value = value;
		this.traversed = traversed;
	}
	ReverseNode(String value, int index) {
		this.value = value;
		this.index = index;
	}

	ReverseNode(String value) {
		this.value = value;
	}
}

public class ReverseDirection {
	int index = 0;
	boolean visited = false;
	ArrayList<ReverseNode> column = new ArrayList<>();
	ArrayList<ArrayList<ReverseNode>> adj_list = new ArrayList<>();
	ArrayList<ReverseNode> depthFirstTraversalList = new ArrayList<>();

	// Constructor
	public ReverseDirection() {
	}

	public void addReverseNode(String ReverseNode) {
		if (!existInColumn(ReverseNode)) {
			ReverseNode n = new ReverseNode(ReverseNode, visited);
			column.add(n);
			adj_list.add(new ArrayList<>());
		}
	}

	public void addEdges(String source, String destination) {
		// Check if Source exist
		if (!existInColumn(source)) {
			addReverseNode(source);
		}
//	    Check if destination exist
		if (!existInColumn(destination)) {
			addReverseNode(destination);
		}
		// Add destination ReverseNode to the adjacency list of the source ReverseNode
		adj_list.get(getReverseNodeIndex(destination)).add(getReverseNode(source));
	}

	public void remove(String source) {
		for (int i = 0; i < column.size(); i++) {
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				if (adj_list.get(i).get(j).value.equals(source)) {
					adj_list.get(i).remove(j++);
				}
			}
		}
	}

	public boolean existInColumn(String destination) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(destination)) {
				return true;
			}
		}
		return false;
	}

	public int getReverseNodeIndex(String destination) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(destination)) {
				return i;
			}
		}
		return -1;
	}

	public ReverseNode getReverseNode(String source) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(source)) {
				return column.get(i);
			}
		}
		return null;
	}

	public void setVisited(String source, boolean status) {
		for (int i = 0; i < column.size(); i++) {
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				if (adj_list.get(i).get(j).value.equals(source)) {
					adj_list.get(i).get(j).visited = true;
				}
			}
		}
	}

	public void printGraph() {
		for (int i = 0; i < adj_list.size(); i++) {
			System.out.print(column.get(i).value + " " + column.get(i).visited + " -> ");
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				System.out.print(adj_list.get(i).get(j).value + " " + adj_list.get(i).get(j).visited + " -> ");
			}
			System.out.println();
		}
	}

	public ArrayList<String> getRoot() {
		ArrayList<String> temp = new ArrayList<>();
		for (int i = 0; i < adj_list.size(); i++) {
			if (adj_list.get(i).size() == 0) {
				temp.add(column.get(i).value);
			}
		}
		return temp;
	}

	public ArrayList<ArrayList<ReverseNode>> makeA2dArr() {
		ArrayList<ArrayList<ReverseNode>> Arr = new ArrayList<>();
		for (int i = 0; i < column.size(); i++) {
			ArrayList<ReverseNode> temp = new ArrayList<>();
			temp.add(column.get(i));
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				temp.add(adj_list.get(i).get(j));
			}
			Arr.add(temp);
		}
		return Arr;
	}

	public ArrayList<ReverseNode> getPreReq(String source) {
		ArrayList<ArrayList<ReverseNode>> Arr = makeA2dArr();
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(0).value)) {
					ArrayList<ReverseNode> withoutSource = Arr.get(i);
					// Remove the source it self, just return the PreReq
					withoutSource.remove(0);
					return withoutSource;
				}
			}
		}
		return null;
	}

	public void dfs(String source) {
		// reset traversal
		for (ReverseNode n : column) {
			n.traversed = false;
		}
		// clear list
		depthFirstTraversalList.clear();
		dfsHelper(source);
	}
	public void dfsHelper(String source) {
		if (getReverseNode(source) == null || getReverseNode(source).traversed) {
			return;
		}
		// Visit the ReverseNode
		depthFirstTraversalList.add(getReverseNode(source));
		getReverseNode(source).traversed = true;

		// Recursively visit all unvisited neighbors
		for (int i = 0; i < getPreReq(source).size(); i++) {
			ReverseNode neighbor = getPreReq(source).get(i);
			if (!PreReqExist(neighbor.value)) {
				// Mark the end of a graph traversal
				neighbor.end = true;
			}
			if (!neighbor.traversed) {
				dfs(neighbor.value);
			}
		}
	}

	public boolean PreReqExist(String source) {
		ArrayList<ArrayList<ReverseNode>> Arr = makeA2dArr();
		// Find the spell line with the spell
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(0).value)) {
//					if there is a prereq, return true, else return false
					if (Arr.get(i).size() > 1) {
						return true;
					}
					return false;
				}
			}
		}
		return false;
	}

	public boolean checkIfVisited(String source) {
		ArrayList<ArrayList<ReverseNode>> Arr = makeA2dArr();
		// Find the spell line with the spell
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(j).value) && Arr.get(i).get(j).visited == true) {
//				if visited, return true, else return false
					return true;
				}
			}
		}
		return false;
	}

	public boolean checkIfNeeded(String source) {
		for (int i = 0; i < adj_list.size(); i++) {
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				if (adj_list.get(i).get(j).value.equals(source)) {
					return true;
				}
			}
		}
		return false;
	}
}
