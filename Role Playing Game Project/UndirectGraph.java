

import java.util.ArrayList;
import java.util.Vector;

class UndirectNode {
	String value;
	int index;
	boolean visited = false;

	// Constructor
	UndirectNode(String value, boolean visited) {
		this.value = value;
		this.visited = visited;
	}

	UndirectNode(String value, int index) {
		this.value = value;
		this.index = index;
	}

	UndirectNode(String value) {
		this.value = value;
	}
}

public class UndirectGraph {
	int index = 0;
	boolean visited = false;
	ArrayList<UndirectNode> column = new ArrayList<>();
	ArrayList<ArrayList<UndirectNode>> adj_list = new ArrayList<>();

	// Constructor
	public UndirectGraph() {
		makeA2dArr();
	}

	public void addUndirectNode(String UndirectNode) {
		if (!existInColumn(UndirectNode)) {
			UndirectNode n = new UndirectNode(UndirectNode, visited);
			column.add(n);
			adj_list.add(new ArrayList<>());
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

	public int getUndirectNodeIndex(String destination) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(destination)) {
				return i;
			}
		}
		return -1;
	}

	public UndirectNode getUndirectNode(String source) {
		for (int i = 0; i < column.size(); i++) {
			if (column.get(i).value.equals(source)) {
				return column.get(i);
			}
		}
		return null;
	}

	public void addEdges(String source, String destination) {
		// Check if Source exist
		if (!existInColumn(source)) {
			addUndirectNode(source);
		}
//	    Check if destination exist
		if (!existInColumn(destination)) {
			addUndirectNode(destination);
		}
		// Add destination UndirectNode to the adjacency list of the source UndirectNode
		adj_list.get(getUndirectNodeIndex(source)).add(getUndirectNode(destination));
		adj_list.get(getUndirectNodeIndex(destination)).add(getUndirectNode(source));

	}

	public void setVisited(String source, boolean status) {
		for (int i = 0; i < adj_list.size(); i++) {
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

	public ArrayList<ArrayList<UndirectNode>> makeA2dArr() {
		ArrayList<ArrayList<UndirectNode>> Arr = new ArrayList<>();
		for (int i = 0; i < column.size(); i++) {
			ArrayList<UndirectNode> temp = new ArrayList<>();
			temp.add(column.get(i));
			for (int j = 0; j < adj_list.get(i).size(); j++) {
				temp.add(adj_list.get(i).get(j));
			}
			Arr.add(temp);
		}
		return Arr;
	}

	public ArrayList<UndirectNode> getPreReq(String source) {
		ArrayList<ArrayList<UndirectNode>> Arr = makeA2dArr();
		for (int i = 0; i < Arr.size(); i++) {
			for (int j = 0; j < Arr.get(i).size(); j++) {
				if (source.equals(Arr.get(i).get(0).value)) {
					return Arr.get(i);
				}
			}
		}
		return null;
	}

	public boolean PreReqExist(String source) {
		ArrayList<ArrayList<UndirectNode>> Arr = makeA2dArr();
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
}
